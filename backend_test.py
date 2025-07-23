#!/usr/bin/env python3
"""
HUMANIDAD UNIDA - Backend API Testing Suite
Tests all backend endpoints for the humanitarian aid platform
"""

import requests
import json
import sys
from datetime import datetime
import os

# Get backend URL from environment
BACKEND_URL = "https://cb10174b-a80f-4d50-b43e-0c40e043587b.preview.emergentagent.com/api"

# Test data as specified in requirements
TEST_DATA = {
    "curp_valid": "ABCD123456HDFGHI01",
    "cfe_service_number": "12345678901",
    "xml_content": "<?xml version='1.0'?><cfdi>test</cfdi>",
    "whatsapp": "525659952408",
    "email": "luisgomez92ux5@gmail.com",
    "user_name": "María González",
    "phone": "5555551234"
}

class HumanidadUnidaAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.results = []
        
    def log_result(self, test_name, success, details="", response_data=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        
    def test_api_base(self):
        """Test GET /api/ - Base API endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "HUMANIDAD UNIDA" in data.get("message", ""):
                    self.log_result("API Base", True, "Welcome message returned correctly", data)
                else:
                    self.log_result("API Base", False, f"Unexpected message: {data}")
            else:
                self.log_result("API Base", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("API Base", False, f"Exception: {str(e)}")
    
    def test_analytics_dashboard(self):
        """Test GET /api/analytics/dashboard"""
        try:
            response = self.session.get(f"{self.base_url}/analytics/dashboard")
            if response.status_code == 200:
                data = response.json()
                required_keys = ["total_requests", "total_helped", "last_updated"]
                if all(key in data for key in required_keys):
                    self.log_result("Analytics Dashboard", True, "Dashboard data structure correct", data)
                else:
                    self.log_result("Analytics Dashboard", False, f"Missing required keys in response: {data}")
            else:
                self.log_result("Analytics Dashboard", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Analytics Dashboard", False, f"Exception: {str(e)}")
    
    def test_cfe_module(self):
        """Test CFE Module - POST /api/cfe/request and GET /api/cfe/requests"""
        # Test CFE request creation - First time ($10)
        try:
            cfe_data = {
                "service_number": TEST_DATA["cfe_service_number"],
                "user_name": TEST_DATA["user_name"],
                "phone": TEST_DATA["phone"],
                "is_first_time": True
            }
            
            response = self.session.post(f"{self.base_url}/cfe/request", json=cfe_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("donation_amount") == 10.0 and data.get("is_first_time") == True:
                    self.log_result("CFE Request First Time", True, "First time donation $10 correct", data)
                    cfe_id = data.get("id")
                else:
                    self.log_result("CFE Request First Time", False, f"Incorrect donation amount or flag: {data}")
            else:
                self.log_result("CFE Request First Time", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("CFE Request First Time", False, f"Exception: {str(e)}")
        
        # Test CFE request creation - Subsequent time ($20)
        try:
            cfe_data_subsequent = {
                "service_number": TEST_DATA["cfe_service_number"],
                "user_name": TEST_DATA["user_name"],
                "phone": TEST_DATA["phone"],
                "is_first_time": False
            }
            
            response = self.session.post(f"{self.base_url}/cfe/request", json=cfe_data_subsequent)
            if response.status_code == 200:
                data = response.json()
                if data.get("donation_amount") == 20.0 and data.get("is_first_time") == False:
                    self.log_result("CFE Request Subsequent", True, "Subsequent donation $20 correct", data)
                else:
                    self.log_result("CFE Request Subsequent", False, f"Incorrect donation amount or flag: {data}")
            else:
                self.log_result("CFE Request Subsequent", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("CFE Request Subsequent", False, f"Exception: {str(e)}")
        
        # Test GET CFE requests
        try:
            response = self.session.get(f"{self.base_url}/cfe/requests")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("CFE Get Requests", True, f"Retrieved {len(data)} CFE requests", {"count": len(data)})
                else:
                    self.log_result("CFE Get Requests", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("CFE Get Requests", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("CFE Get Requests", False, f"Exception: {str(e)}")
    
    def test_certificates_module(self):
        """Test Certificates Module - POST /api/certificates/request and GET /api/certificates/links"""
        # Test certificate request creation ($80 donation)
        try:
            cert_data = {
                "user_name": TEST_DATA["user_name"],
                "phone": TEST_DATA["phone"],
                "certificate_type": "SEP"
            }
            
            response = self.session.post(f"{self.base_url}/certificates/request", json=cert_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("donation_amount") == 80.0 and data.get("certificate_type") == "SEP":
                    self.log_result("Certificate Request", True, "Certificate request with $80 donation created", data)
                else:
                    self.log_result("Certificate Request", False, f"Incorrect donation amount or type: {data}")
            else:
                self.log_result("Certificate Request", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Certificate Request", False, f"Exception: {str(e)}")
        
        # Test certificate links
        try:
            response = self.session.get(f"{self.base_url}/certificates/links")
            if response.status_code == 200:
                data = response.json()
                expected_links = ["SEP", "INEA", "CDMX", "Puebla"]
                if all(link in data for link in expected_links):
                    self.log_result("Certificate Links", True, "All required certificate links present", data)
                else:
                    self.log_result("Certificate Links", False, f"Missing certificate links: {data}")
            else:
                self.log_result("Certificate Links", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Certificate Links", False, f"Exception: {str(e)}")
    
    def test_fiscal_module(self):
        """Test Fiscal Module - POST /api/fiscal/request and GET /api/fiscal/sat-guide"""
        # Test fiscal request with valid CURP
        try:
            fiscal_data = {
                "curp": TEST_DATA["curp_valid"],
                "user_name": TEST_DATA["user_name"],
                "phone": TEST_DATA["phone"]
            }
            
            response = self.session.post(f"{self.base_url}/fiscal/request", json=fiscal_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("curp") == TEST_DATA["curp_valid"].upper():
                    self.log_result("Fiscal Request Valid CURP", True, "Valid CURP accepted and processed", data)
                else:
                    self.log_result("Fiscal Request Valid CURP", False, f"CURP not processed correctly: {data}")
            else:
                self.log_result("Fiscal Request Valid CURP", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Fiscal Request Valid CURP", False, f"Exception: {str(e)}")
        
        # Test fiscal request with invalid CURP (should fail)
        try:
            invalid_fiscal_data = {
                "curp": "INVALID123",
                "user_name": TEST_DATA["user_name"],
                "phone": TEST_DATA["phone"]
            }
            
            response = self.session.post(f"{self.base_url}/fiscal/request", json=invalid_fiscal_data)
            if response.status_code == 400:
                self.log_result("Fiscal Request Invalid CURP", True, "Invalid CURP correctly rejected", {"status_code": 400})
            else:
                self.log_result("Fiscal Request Invalid CURP", False, f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_result("Fiscal Request Invalid CURP", False, f"Exception: {str(e)}")
        
        # Test SAT guide
        try:
            response = self.session.get(f"{self.base_url}/fiscal/sat-guide")
            if response.status_code == 200:
                data = response.json()
                required_keys = ["steps", "sat_url", "requirements"]
                if all(key in data for key in required_keys):
                    self.log_result("Fiscal SAT Guide", True, "SAT guide structure correct", data)
                else:
                    self.log_result("Fiscal SAT Guide", False, f"Missing required keys: {data}")
            else:
                self.log_result("Fiscal SAT Guide", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Fiscal SAT Guide", False, f"Exception: {str(e)}")
    
    def test_cfdi_module(self):
        """Test CFDI Module - POST /api/cfdi/verify and GET /api/cfdi/fraud-guide"""
        # Test CFDI verification
        try:
            cfdi_data = {
                "xml_content": TEST_DATA["xml_content"]
            }
            
            response = self.session.post(f"{self.base_url}/cfdi/verify", json=cfdi_data)
            if response.status_code == 200:
                data = response.json()
                required_keys = ["is_valid", "status", "rfc_emisor", "rfc_receptor"]
                if all(key in data for key in required_keys):
                    self.log_result("CFDI Verification", True, "CFDI verification successful", data)
                else:
                    self.log_result("CFDI Verification", False, f"Missing verification keys: {data}")
            else:
                self.log_result("CFDI Verification", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("CFDI Verification", False, f"Exception: {str(e)}")
        
        # Test invalid XML (should fail)
        try:
            invalid_cfdi_data = {
                "xml_content": "invalid xml content"
            }
            
            response = self.session.post(f"{self.base_url}/cfdi/verify", json=invalid_cfdi_data)
            if response.status_code == 400:
                self.log_result("CFDI Invalid XML", True, "Invalid XML correctly rejected", {"status_code": 400})
            else:
                self.log_result("CFDI Invalid XML", False, f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_result("CFDI Invalid XML", False, f"Exception: {str(e)}")
        
        # Test fraud guide
        try:
            response = self.session.get(f"{self.base_url}/cfdi/fraud-guide")
            if response.status_code == 200:
                data = response.json()
                required_keys = ["common_frauds", "verification_tips", "official_links"]
                if all(key in data for key in required_keys):
                    self.log_result("CFDI Fraud Guide", True, "Fraud guide structure correct", data)
                else:
                    self.log_result("CFDI Fraud Guide", False, f"Missing required keys: {data}")
            else:
                self.log_result("CFDI Fraud Guide", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("CFDI Fraud Guide", False, f"Exception: {str(e)}")
    
    def test_tramites_module(self):
        """Test Tramites Module - GET /api/tramites/documents and POST /api/tramites/download"""
        # Test get available documents
        try:
            response = self.session.get(f"{self.base_url}/tramites/documents")
            if response.status_code == 200:
                data = response.json()
                if "formats" in data and isinstance(data["formats"], list):
                    document_types = [doc["type"] for doc in data["formats"]]
                    expected_types = ["CURP", "NSS", "ACTA", "AFORE", "SEMANAS"]
                    if all(doc_type in document_types for doc_type in expected_types):
                        self.log_result("Tramites Documents", True, "All required document types available", data)
                    else:
                        self.log_result("Tramites Documents", False, f"Missing document types: {data}")
                else:
                    self.log_result("Tramites Documents", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Tramites Documents", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Tramites Documents", False, f"Exception: {str(e)}")
        
        # Test download registration
        try:
            download_data = {
                "document_type": "CURP"
            }
            
            response = self.session.post(f"{self.base_url}/tramites/download", json=download_data)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "CURP" in data["message"]:
                    self.log_result("Tramites Download", True, "Download registration successful", data)
                else:
                    self.log_result("Tramites Download", False, f"Unexpected response: {data}")
            else:
                self.log_result("Tramites Download", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Tramites Download", False, f"Exception: {str(e)}")
    
    def test_contact_module(self):
        """Test Contact Module - POST /api/contact/message and GET /api/contact/info"""
        # Test contact message creation
        try:
            contact_data = {
                "name": TEST_DATA["user_name"],
                "email": TEST_DATA["email"],
                "phone": TEST_DATA["phone"],
                "message": "Necesito ayuda con mi trámite de CFE, soy adulto mayor y no entiendo el proceso digital."
            }
            
            response = self.session.post(f"{self.base_url}/contact/message", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("email") == TEST_DATA["email"] and data.get("name") == TEST_DATA["user_name"]:
                    self.log_result("Contact Message", True, "Contact message created successfully", data)
                else:
                    self.log_result("Contact Message", False, f"Message data incorrect: {data}")
            else:
                self.log_result("Contact Message", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Contact Message", False, f"Exception: {str(e)}")
        
        # Test contact info
        try:
            response = self.session.get(f"{self.base_url}/contact/info")
            if response.status_code == 200:
                data = response.json()
                expected_whatsapp = TEST_DATA["whatsapp"]
                expected_email = TEST_DATA["email"]
                
                if (data.get("whatsapp") == expected_whatsapp and 
                    data.get("email") == expected_email):
                    self.log_result("Contact Info", True, "Contact info correct", data)
                else:
                    self.log_result("Contact Info", False, f"Contact info mismatch: {data}")
            else:
                self.log_result("Contact Info", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Contact Info", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting HUMANIDAD UNIDA Backend API Tests")
        print(f"🔗 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run all test modules
        self.test_api_base()
        self.test_analytics_dashboard()
        self.test_cfe_module()
        self.test_certificates_module()
        self.test_fiscal_module()
        self.test_cfdi_module()
        self.test_tramites_module()
        self.test_contact_module()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.results)
        passed_tests = sum(1 for result in self.results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.results:
                if not result["success"]:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        return passed_tests, failed_tests, self.results

if __name__ == "__main__":
    tester = HumanidadUnidaAPITester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    sys.exit(0 if failed == 0 else 1)