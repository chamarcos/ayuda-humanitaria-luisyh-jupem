from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="HUMANIDAD UNIDA API", description="Sistema integral de ayuda humanitaria")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ========== MODELS ==========

# Original models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# CFE Models
class CFERequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_number: str
    user_name: str
    phone: str
    donation_amount: float  # 10 or 20
    is_first_time: bool
    status: str = "pending"  # pending, verified, completed
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CFERequestCreate(BaseModel):
    service_number: str
    user_name: str
    phone: str
    is_first_time: bool = True

# Certificados Escolares Models
class CertificateRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    phone: str
    certificate_type: str  # SEP, INEA, CDMX, Puebla
    donation_paid: bool = False
    donation_amount: float = 80.0
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CertificateRequestCreate(BaseModel):
    user_name: str
    phone: str
    certificate_type: str

# Constancia Fiscal Models
class FiscalRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    curp: str
    user_name: str
    phone: str
    status: str = "pending"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class FiscalRequestCreate(BaseModel):
    curp: str
    user_name: str
    phone: str

# CFDI Models
class CFDIVerification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    xml_content: str
    verification_result: dict
    user_ip: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CFDIVerificationCreate(BaseModel):
    xml_content: str

# Tramites Models
class TramiteDownload(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    document_type: str  # CURP, NSS, Acta, AFORE, etc.
    user_ip: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class TramiteDownloadCreate(BaseModel):
    document_type: str

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: str
    message: str

# IMSS Semanas Models (Ultra-Simple for elderly)
class IMSSSemanasRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nss: str  # Número de Seguridad Social
    curp: str
    user_name: str
    birth_date: str  # Simple string format DD/MM/YYYY
    phone: str
    status: str = "pending"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class IMSSSemanasRequestCreate(BaseModel):
    nss: str
    curp: str
    user_name: str
    birth_date: str
    phone: str

# Email Recovery Models (Ultra-Simple for elderly)
class EmailRecoveryRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email_to_recover: str
    user_name: str
    birth_date: str
    phone: str
    curp: str
    email_provider: str  # Gmail, Outlook, Yahoo, etc.
    additional_info: str = ""  # Any additional info they remember
    status: str = "pending"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class EmailRecoveryRequestCreate(BaseModel):
    email_to_recover: str
    user_name: str
    birth_date: str
    phone: str
    curp: str
    email_provider: str
    additional_info: Optional[str] = ""


# ========== ROUTES ==========

# Original routes
@api_router.get("/")
async def root():
    return {"message": "HUMANIDAD UNIDA - Sistema de Ayuda Humanitaria"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# ========== CFE ROUTES ==========
@api_router.post("/cfe/request", response_model=CFERequest)
async def create_cfe_request(request: CFERequestCreate):
    # Determine donation amount based on whether it's first time
    donation_amount = 10.0 if request.is_first_time else 20.0
    
    cfe_dict = request.dict()
    cfe_dict['donation_amount'] = donation_amount
    cfe_obj = CFERequest(**cfe_dict)
    
    await db.cfe_requests.insert_one(cfe_obj.dict())
    return cfe_obj

@api_router.get("/cfe/requests", response_model=List[CFERequest])
async def get_cfe_requests():
    requests = await db.cfe_requests.find().to_list(1000)
    return [CFERequest(**req) for req in requests]

@api_router.put("/cfe/request/{request_id}/verify")
async def verify_cfe_request(request_id: str):
    result = await db.cfe_requests.update_one(
        {"id": request_id},
        {"$set": {"status": "verified"}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Request verified successfully"}

# ========== CERTIFICADOS ROUTES ==========
@api_router.post("/certificates/request", response_model=CertificateRequest)
async def create_certificate_request(request: CertificateRequestCreate):
    cert_dict = request.dict()
    cert_obj = CertificateRequest(**cert_dict)
    
    await db.certificate_requests.insert_one(cert_obj.dict())
    return cert_obj

@api_router.get("/certificates/requests", response_model=List[CertificateRequest])
async def get_certificate_requests():
    requests = await db.certificate_requests.find().to_list(1000)
    return [CertificateRequest(**req) for req in requests]

@api_router.get("/certificates/links")
async def get_certificate_links():
    return {
        "SEP": "https://www.gob.mx/sep",
        "INEA": "https://certificados.inea.gob.mx/Consulta",
        "CDMX": "https://certificacion.cdmx.gob.mx/",
        "Puebla": "https://sisep.puebla.gob.mx/certificados"
    }

# ========== FISCAL ROUTES ==========
@api_router.post("/fiscal/request", response_model=FiscalRequest)
async def create_fiscal_request(request: FiscalRequestCreate):
    # Validate CURP format
    curp_pattern = r'^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$'
    if not re.match(curp_pattern, request.curp.upper()):
        raise HTTPException(status_code=400, detail="CURP format is invalid")
    
    fiscal_dict = request.dict()
    fiscal_dict['curp'] = fiscal_dict['curp'].upper()
    fiscal_obj = FiscalRequest(**fiscal_dict)
    
    await db.fiscal_requests.insert_one(fiscal_obj.dict())
    return fiscal_obj

@api_router.get("/fiscal/requests", response_model=List[FiscalRequest])
async def get_fiscal_requests():
    requests = await db.fiscal_requests.find().to_list(1000)
    return [FiscalRequest(**req) for req in requests]

@api_router.get("/fiscal/sat-guide")
async def get_sat_guide():
    return {
        "steps": [
            "Ingresa a www.sat.gob.mx",
            "Selecciona 'Personas Físicas'",
            "Busca 'Constancia de Situación Fiscal'",
            "Ingresa tu CURP y datos personales",
            "Descarga tu constancia en PDF"
        ],
        "sat_url": "https://www.sat.gob.mx/personas/constancia-de-situacion-fiscal",
        "requirements": ["CURP", "Correo electrónico", "Datos personales actualizados"]
    }

# ========== CFDI ROUTES ==========
@api_router.post("/cfdi/verify")
async def verify_cfdi(request: CFDIVerificationCreate, user_ip: str = ""):
    # This is a simplified CFDI verification - in production you'd integrate with SAT
    try:
        # Basic XML validation
        if not request.xml_content.strip().startswith('<?xml'):
            raise HTTPException(status_code=400, detail="Invalid XML format")
        
        # Simulate verification result
        verification_result = {
            "is_valid": True,
            "status": "Activo",
            "rfc_emisor": "XAXX010101000",
            "rfc_receptor": "XAXX010101000",
            "fecha_emision": datetime.utcnow().isoformat(),
            "warnings": ["Este es un ejemplo de verificación"]
        }
        
        cfdi_obj = CFDIVerification(
            xml_content=request.xml_content[:1000],  # Store only first 1000 chars
            verification_result=verification_result,
            user_ip=user_ip
        )
        
        await db.cfdi_verifications.insert_one(cfdi_obj.dict())
        return verification_result
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing CFDI: {str(e)}")

@api_router.get("/cfdi/fraud-guide")
async def get_fraud_guide():
    return {
        "common_frauds": [
            "Facturas falsas con sellos inexistentes",
            "Empresas fantasma sin domicilio real",
            "CFDIs con datos fiscales incorrectos",
            "Solicitudes de dinero para 'activar' facturas"
        ],
        "verification_tips": [
            "Siempre verifica el sello digital en el SAT",
            "Confirma que la empresa emisora existe",
            "No compartas tu RFC con desconocidos",
            "Nunca pagues por servicios gratuitos del SAT"
        ],
        "official_links": {
            "sat_verification": "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx",
            "rfc_validation": "https://www.sat.gob.mx/consulta/23487/consulta-tu-clave-de-rfc"
        }
    }

# ========== TRAMITES ROUTES ==========
@api_router.post("/tramites/download")
async def register_download(request: TramiteDownloadCreate, user_ip: str = ""):
    download_obj = TramiteDownload(
        document_type=request.document_type,
        user_ip=user_ip
    )
    
    await db.tramite_downloads.insert_one(download_obj.dict())
    return {"message": f"Download registered for {request.document_type}"}

@api_router.get("/tramites/documents")
async def get_available_documents():
    return {
        "formats": [
            {
                "type": "CURP",
                "name": "Formato de CURP",
                "description": "Formato oficial para obtener tu CURP",
                "url": "https://www.gob.mx/curp/"
            },
            {
                "type": "NSS",
                "name": "Número de Seguridad Social",
                "description": "Consulta tu NSS del IMSS",
                "url": "http://www.imss.gob.mx/servicios/consultanss"
            },
            {
                "type": "ACTA",
                "name": "Acta de Nacimiento",
                "description": "Solicitud de acta de nacimiento",
                "url": "https://www.gob.mx/ActaNacimiento/"
            },
            {
                "type": "AFORE",
                "name": "Estado de Cuenta AFORE",
                "description": "Consulta tu cuenta de AFORE",
                "url": "https://www.gob.mx/consar/acciones-y-programas/estado-de-cuenta-afore"
            },
            {
                "type": "SEMANAS",
                "name": "Semanas Cotizadas",
                "description": "Consulta semanas cotizadas IMSS",
                "url": "http://www.imss.gob.mx/servicios/semanascotizadas"
            }
        ]
    }

# ========== CONTACT ROUTES ==========
@api_router.post("/contact/message", response_model=ContactMessage)
async def create_contact_message(request: ContactMessageCreate):
    contact_obj = ContactMessage(**request.dict())
    await db.contact_messages.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contact/info")
async def get_contact_info():
    return {
        "whatsapp": "525659952408",
        "whatsapp_url": "https://wa.me/525659952408",
        "email": "luisgomez92ux5@gmail.com",
        "business_hours": "Lunes a Viernes 9:00 AM - 6:00 PM",
        "response_time": "24 horas máximo"
    }

# ========== ANALYTICS ROUTES ==========
@api_router.get("/analytics/dashboard")
async def get_dashboard_analytics():
    # Get basic statistics
    total_cfe = await db.cfe_requests.count_documents({})
    total_certificates = await db.certificate_requests.count_documents({})
    total_fiscal = await db.fiscal_requests.count_documents({})
    total_contacts = await db.contact_messages.count_documents({})
    
    return {
        "total_requests": {
            "cfe": total_cfe,
            "certificates": total_certificates,
            "fiscal": total_fiscal,
            "contacts": total_contacts
        },
        "total_helped": total_cfe + total_certificates + total_fiscal,
        "last_updated": datetime.utcnow().isoformat()
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
