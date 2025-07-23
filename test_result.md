#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "HUMANIDAD UNIDA - Sistema integral de ayuda humanitaria digital para combatir el abandono digital y proteger a personas vulnerables de fraudes, especialmente adultos mayores. Incluye módulos para CFE, certificados escolares, constancia fiscal, CFDI, trámites y contacto."

backend:
  - task: "API Base y CORS Configuration"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "FastAPI configurado con CORS, MongoDB y estructura base completa"

  - task: "CFE Reimpresión API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "API completa para solicitudes CFE con donaciones $10/$20 y validación WhatsApp"
      - working: true
        agent: "testing"
        comment: "✅ TESTED: All CFE endpoints working correctly. POST /api/cfe/request correctly applies $10 for first time users and $20 for subsequent users. GET /api/cfe/requests returns proper list. Service number validation working."

  - task: "Certificados Escolares API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "API para certificados con enlaces oficiales SEP, INEA, CDMX, Puebla"
      - working: true
        agent: "testing"
        comment: "✅ TESTED: Certificate endpoints working perfectly. POST /api/certificates/request creates requests with $80 donation amount. GET /api/certificates/links returns all required official links (SEP, INEA, CDMX, Puebla)."

  - task: "Constancia Fiscal API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "API con validación CURP y guía paso a paso SAT"

  - task: "CFDI Verificador API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Verificador CFDI básico con guías anti-fraude educativas"

  - task: "Trámites y Documentos API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "API para trámites CURP, NSS, Acta, AFORE, semanas cotizadas"

  - task: "Contacto y Analytics API"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "API de contacto y dashboard con estadísticas en tiempo real"

frontend:
  - task: "Estructura Base y Routing"
    implemented: true
    working: true
    file: "/app/frontend/src/App.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "React routing configurado con todas las páginas principales"

  - task: "Navbar y Navigation"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Navbar.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Navbar responsive con contador de personas ayudadas y botón compartir"

  - task: "Landing Page Principal"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Home.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Landing page espectacular con misión, estadísticas y CTAs"

  - task: "Módulo CFE Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/CFE.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Formulario CFE completo con flujo de donación y datos bancarios"

  - task: "Módulo Certificados Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Certificates.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Página certificados con donación $80 y enlaces oficiales verificados"

  - task: "Módulo Fiscal Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Fiscal.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Validador CURP con guía SAT paso a paso y enlaces oficiales"

  - task: "Módulo CFDI Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/CFDI.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Verificador CFDI con tabs educativos anti-fraude"

  - task: "Módulo Trámites Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Tramites.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Centro de trámites con cards de documentos oficiales"

  - task: "Módulo Contacto Frontend"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Contact.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Página contacto con WhatsApp, email y formulario de contacto"

  - task: "Footer Component"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Footer.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Footer completo con misión, servicios y contacto"

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus:
    - "CFE Reimpresión API"
    - "Certificados Escolares API"
    - "Constancia Fiscal API"
    - "CFDI Verificador API"
    - "Landing Page Principal"
    - "Módulo CFE Frontend"
    - "Módulo Certificados Frontend"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Sistema HUMANIDAD UNIDA completamente implementado con todos los módulos. Plataforma moderna para ayuda humanitaria digital con 6 módulos principales: CFE, Certificados, Fiscal, CFDI, Trámites y Contacto. Todos los componentes integrados con APIs y frontend responsive. Listo para testing completo."