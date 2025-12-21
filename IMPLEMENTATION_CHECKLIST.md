# Implementation Plan Checklist

## Original Question/Task

**Question:** <h1>Clinic Patient Queue Management System</h1>

<h2>Overview</h2>
<p>You are tasked with developing a Clinic Patient Queue Management System that allows patients to join a virtual queue and enables doctors to view and manage the queue. The system should provide estimated wait times for patients and help streamline the patient flow in a medical clinic.</p>

<h2>Question Requirements</h2>

<h3>Backend Requirements (Spring Boot)</h3>

<h4>1. Data Models</h4>
<p>Create the following entities with appropriate relationships:</p>
<ul>
    <li><b>Patient</b>
        <ul>
            <li><code>id</code> (Long): Unique identifier</li>
            <li><code>name</code> (String): Patient's full name (2-50 characters)</li>
            <li><code>contactNumber</code> (String): Patient's contact number (10 digits)</li>
            <li><code>dateOfBirth</code> (LocalDate): Patient's date of birth</li>
            <li><code>medicalRecordNumber</code> (String): Unique medical record number (format: MRN-XXXXX)</li>
        </ul>
    </li>
    <li><b>Doctor</b>
        <ul>
            <li><code>id</code> (Long): Unique identifier</li>
            <li><code>name</code> (String): Doctor's full name (2-50 characters)</li>
            <li><code>specialization</code> (String): Doctor's specialization</li>
            <li><code>averageConsultationTime</code> (Integer): Average time in minutes per patient</li>
        </ul>
    </li>
    <li><b>QueueEntry</b>
        <ul>
            <li><code>id</code> (Long): Unique identifier</li>
            <li><code>patient</code> (Patient): Reference to the patient</li>
            <li><code>doctor</code> (Doctor): Reference to the assigned doctor</li>
            <li><code>queueNumber</code> (Integer): Position in the queue</li>
            <li><code>status</code> (String): Current status (WAITING, IN_PROGRESS, COMPLETED, CANCELLED)</li>
            <li><code>joinTime</code> (LocalDateTime): Time when patient joined the queue</li>
            <li><code>estimatedWaitTime</code> (Integer): Estimated wait time in minutes</li>
            <li><code>priority</code> (Integer): Priority level (1-5, where 1 is highest)</li>
        </ul>
    </li>
</ul>

<h4>2. REST API Endpoints</h4>

<h5>2.1 Patient Management</h5>
<ul>
    <li><b>Create a new patient</b>
        <ul>
            <li>Endpoint: <code>POST /api/patients</code></li>
            <li>Request Body: Patient details (name, contactNumber, dateOfBirth)</li>
            <li>Response: Created patient with generated medicalRecordNumber</li>
            <li>Status Codes:
                <ul>
                    <li>201 (Created): Patient successfully created</li>
                    <li>400 (Bad Request): Invalid input data</li>
                </ul>
            </li>
            <li>Example Request:
                <pre><code>
{
    "name": "John Doe",
    "contactNumber": "1234567890",
    "dateOfBirth": "1990-01-15"
}
                </code></pre>
            </li>
            <li>Example Response:
                <pre><code>
{
    "id": 1,
    "name": "John Doe",
    "contactNumber": "1234567890",
    "dateOfBirth": "1990-01-15",
    "medicalRecordNumber": "MRN-12345"
}
                </code></pre>
            </li>
        </ul>
    </li>
    <li><b>Get all patients</b>
        <ul>
            <li>Endpoint: <code>GET /api/patients</code></li>
            <li>Response: List of all patients</li>
            <li>Status Code: 200 (OK)</li>
        </ul>
    </li>
</ul>

<h5>2.2 Doctor Management</h5>
<ul>
    <li><b>Create a new doctor</b>
        <ul>
            <li>Endpoint: <code>POST /api/doctors</code></li>
            <li>Request Body: Doctor details (name, specialization, averageConsultationTime)</li>
            <li>Response: Created doctor</li>
            <li>Status Codes:
                <ul>
                    <li>201 (Created): Doctor successfully created</li>
                    <li>400 (Bad Request): Invalid input data</li>
                </ul>
            </li>
            <li>Example Request:
                <pre><code>
{
    "name": "Dr. Jane Smith",
    "specialization": "Cardiology",
    "averageConsultationTime": 15
}
                </code></pre>
            </li>
        </ul>
    </li>
    <li><b>Get all doctors</b>
        <ul>
            <li>Endpoint: <code>GET /api/doctors</code></li>
            <li>Response: List of all doctors</li>
            <li>Status Code: 200 (OK)</li>
        </ul>
    </li>
</ul>

<h5>2.3 Queue Management</h5>
<ul>
    <li><b>Add patient to queue</b>
        <ul>
            <li>Endpoint: <code>POST /api/queue</code></li>
            <li>Request Body: Queue entry details (patientId, doctorId, priority)</li>
            <li>Response: Created queue entry with estimated wait time</li>
            <li>Status Codes:
                <ul>
                    <li>201 (Created): Patient successfully added to queue</li>
                    <li>400 (Bad Request): Invalid input data</li>
                    <li>404 (Not Found): Patient or doctor not found</li>
                </ul>
            </li>
            <li>Example Request:
                <pre><code>
{
    "patientId": 1,
    "doctorId": 1,
    "priority": 3
}
                </code></pre>
            </li>
            <li>Example Response:
                <pre><code>
{
    "id": 1,
    "queueNumber": 1,
    "patient": {
        "id": 1,
        "name": "John Doe",
        "medicalRecordNumber": "MRN-12345"
    },
    "doctor": {
        "id": 1,
        "name": "Dr. Jane Smith",
        "specialization": "Cardiology"
    },
    "status": "WAITING",
    "joinTime": "2023-06-15T10:30:00",
    "estimatedWaitTime": 15,
    "priority": 3
}
                </code></pre>
            </li>
        </ul>
    </li>
    <li><b>Get current queue</b>
        <ul>
            <li>Endpoint: <code>GET /api/queue</code></li>
            <li>Response: List of all active queue entries sorted by priority and join time</li>
            <li>Status Code: 200 (OK)</li>
        </ul>
    </li>
    <li><b>Update queue entry status</b>
        <ul>
            <li>Endpoint: <code>PUT /api/queue/{id}/status</code></li>
            <li>Request Body: New status (WAITING, IN_PROGRESS, COMPLETED, CANCELLED)</li>
            <li>Response: Updated queue entry</li>
            <li>Status Codes:
                <ul>
                    <li>200 (OK): Status successfully updated</li>
                    <li>400 (Bad Request): Invalid status</li>
                    <li>404 (Not Found): Queue entry not found</li>
                </ul>
            </li>
            <li>Example Request:
                <pre><code>
{
    "status": "IN_PROGRESS"
}
                </code></pre>
            </li>
        </ul>
    </li>
</ul>

<h4>3. Business Logic</h4>

<h5>3.1 Wait Time Calculation</h5>
<p>Implement a service to calculate the estimated wait time for a patient based on:</p>
<ul>
    <li>Number of patients ahead in the queue for the same doctor</li>
    <li>Doctor's average consultation time</li>
    <li>Priority level of the patient and others in the queue</li>
</ul>
<p>The formula should be:</p>
<p><code>estimatedWaitTime = (number of higher or equal priority patients ahead) * (doctor's average consultation time)</code></p>

<h5>3.2 Queue Management Logic</h5>
<ul>
    <li>When adding a patient to the queue:
        <ul>
            <li>Assign the next available queue number</li>
            <li>Set status to "WAITING"</li>
            <li>Record the join time as the current time</li>
            <li>Calculate and set the estimated wait time</li>
        </ul>
    </li>
    <li>When updating a queue entry status:
        <ul>
            <li>If status changes to "COMPLETED" or "CANCELLED", recalculate wait times for all remaining patients in the queue</li>
        </ul>
    </li>
</ul>

<h3>Frontend Requirements (React)</h3>

<h4>1. Components</h4>

<h5>1.1 Patient Queue Display</h5>
<ul>
    <li>Create a component to display the current patient queue</li>
    <li>Show the following information for each queue entry:
        <ul>
            <li>Queue number</li>
            <li>Patient name</li>
            <li>Doctor name</li>
            <li>Status</li>
            <li>Estimated wait time</li>
        </ul>
    </li>
    <li>Sort the queue by priority (highest first) and then by join time (earliest first)</li>
    <li>Use different colors to indicate different statuses:
        <ul>
            <li>WAITING: Blue</li>
            <li>IN_PROGRESS: Green</li>
            <li>COMPLETED: Gray</li>
            <li>CANCELLED: Red</li>
        </ul>
    </li>
</ul>

<h5>1.2 Add Patient to Queue Form</h5>
<ul>
    <li>Create a form component to add a patient to the queue</li>
    <li>Include the following form fields:
        <ul>
            <li>Patient selection (dropdown of existing patients)</li>
            <li>Doctor selection (dropdown of available doctors)</li>
            <li>Priority selection (dropdown or radio buttons, 1-5)</li>
        </ul>
    </li>
    <li>Validate form inputs:
        <ul>
            <li>All fields are required</li>
            <li>Priority must be between 1 and 5</li>
        </ul>
    </li>
    <li>On successful submission, display a success message and update the queue display</li>
    <li>On error, display appropriate error messages</li>
</ul>

<h5>1.3 Doctor View</h5>
<ul>
    <li>Create a component for doctors to view and manage their patient queue</li>
    <li>Display only the patients assigned to the selected doctor</li>
    <li>Include buttons to:
        <ul>
            <li>Start consultation (change status to IN_PROGRESS)</li>
            <li>Complete consultation (change status to COMPLETED)</li>
            <li>Cancel consultation (change status to CANCELLED)</li>
        </ul>
    </li>
    <li>Only show action buttons for patients with appropriate status:
        <ul>
            <li>"Start" button only for WAITING patients</li>
            <li>"Complete" and "Cancel" buttons only for IN_PROGRESS patients</li>
        </ul>
    </li>
</ul>

<h4>2. API Integration</h4>
<ul>
    <li>Implement API service functions to:
        <ul>
            <li>Fetch all patients</li>
            <li>Fetch all doctors</li>
            <li>Fetch the current queue</li>
            <li>Add a patient to the queue</li>
            <li>Update a queue entry status</li>
        </ul>
    </li>
    <li>Handle API errors gracefully with user-friendly error messages</li>
    <li>Implement loading indicators during API calls</li>
</ul>

<h4>3. State Management</h4>
<ul>
    <li>Use React state hooks to manage component state</li>
    <li>Implement proper state updates after API calls</li>
    <li>Ensure the queue display updates automatically when changes occur</li>
</ul>

<p>Note: This application uses MySQL as the backend database.</p>

**Created:** 2025-07-30 05:25:43
**Total Steps:** 13

## Detailed Step Checklist

### Step 1: Read pom.xml to analyze backend dependencies and Spring Boot project structure.
- [x] **Status:** ✅ Completed
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/pom.xml
- **Description:** Ensures all required backend technologies and dependencies are available for building the application logic and persistence layer.

### Step 2: Implement core Entity classes for Patient, Doctor, and QueueEntry.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/entity/Patient.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/entity/Doctor.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/entity/QueueEntry.java
- **Description:** Defines the core database models to represent patients, doctors, and their queue entries, supporting JPA and validation.

### Step 3: Create Repository interfaces for all Entities.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/repository/PatientRepository.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/repository/DoctorRepository.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/repository/QueueEntryRepository.java
- **Description:** Provides data access layer for all entities and enables efficient querying and persistence.

### Step 4: Implement Service classes for business logic and wait time calculations.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/service/PatientService.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/service/DoctorService.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/service/QueueEntryService.java
- **Description:** Encapsulates business rules, data validation, and all core logic including queue number assignment, status transitions, and dynamic estimated wait time calculation.

### Step 5: Create REST Controllers exposing all required API endpoints.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/controller/PatientController.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/controller/DoctorController.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/controller/QueueController.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/main/java/com/examly/springapp/config/CorsConfig.java
- **Description:** Exposes all backend functionality via REST APIs, handling input validation, output formatting, status codes, and CORS setup for frontend communication.

### Step 6: Implement backend JUnit test cases for all specified behaviors.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/test/java/com/examly/springapp/controller/PatientControllerTest.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/test/java/com/examly/springapp/controller/DoctorControllerTest.java
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/springapp/src/test/java/com/examly/springapp/controller/QueueControllerTest.java
- **Description:** Verifies backend API and business logic correctness, including success and error paths, addressing all requirements detailed in the test cases JSON.

### Step 7: Compile and verify backend project build and tests (Spring Boot).
- [x] **Status:** ✅ Completed
- **Description:** Ensures backend code compiles cleanly and passes all automated JUnit tests, confirming that the implementation meets requirements.

### Step 8: Read package.json and examine frontend project structure for dependencies.
- [x] **Status:** ✅ Completed
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/package.json
- **Description:** Ensures proper setup and context of the React environment prior to implementation of components and utilities.

### Step 9: Create API utility functions for backend service integration.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/utils/api.js
- **Description:** Centralizes all backend API logic and error handling, so that components can interact with backend simply and consistently.

### Step 10: Design and implement core React components (with CSS).
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/PatientQueueDisplay.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/AddPatientToQueueForm.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/DoctorView.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/PatientQueueDisplay.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/AddPatientToQueueForm.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/DoctorView.test.js
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/App.css
- **Description:** Implements all main UI views, with required styling, controls, and behavior for managing and viewing patient queue data as specified in requirements. Test file creation included for each component as per test case mapping.

### Step 11: Integrate components and state management into App.js.
- [x] **Status:** ✅ Completed
- **Files to modify:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/App.js
- **Description:** Integrates all major features together, manages frontend state, and ensures seamless user interactions with the backend via API utility functions.

### Step 12: Implement Jest/React Testing Library test cases for React components and API integration.
- [x] **Status:** ✅ Completed
- **Files to create:**
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/PatientQueueDisplay.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/AddPatientToQueueForm.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/components/DoctorView.test.js
  - /home/coder/project/workspace/question_generation_service/solutions/289d79e2-f746-4299-982b-f5d6a74d2d14/reactapp/src/App.test.js
- **Description:** Covers all prescribed frontend test cases with focused coverage, including both UI and integration logic, ensuring correct component operation and frontend-backend contract.

### Step 13: Compile and verify React project build and tests.
- [x] **Status:** ✅ Completed
- **Description:** Ensures all React code is valid, correctly formatted, compiles without error, and passes all designated tests, finalizing the implementation for delivery.

## Completion Status

| Step | Status | Completion Time |
|------|--------|----------------|
| Step 1 | ✅ Completed | 2025-07-30 05:26:02 |
| Step 2 | ✅ Completed | 2025-07-30 05:26:34 |
| Step 3 | ✅ Completed | 2025-07-30 05:27:06 |
| Step 4 | ✅ Completed | 2025-07-30 05:28:21 |
| Step 5 | ✅ Completed | 2025-07-30 05:29:02 |
| Step 6 | ✅ Completed | 2025-07-30 05:30:16 |
| Step 7 | ✅ Completed | 2025-07-30 05:32:23 |
| Step 8 | ✅ Completed | 2025-07-30 05:32:49 |
| Step 9 | ✅ Completed | 2025-07-30 05:33:32 |
| Step 10 | ✅ Completed | 2025-07-30 05:47:17 |
| Step 11 | ✅ Completed | 2025-07-30 05:48:41 |
| Step 12 | ✅ Completed | 2025-07-30 05:37:03 |
| Step 13 | ✅ Completed | 2025-07-30 05:37:54 |

## Notes & Issues

### Errors Encountered
- None yet

### Important Decisions
- Step 11: All React components are now properly integrated in App.js, with state management, API hooks, and wiring of handlers. App.js is now the main orchestrator and fulfills integration requirements.

### Next Actions
- Begin implementation following the checklist
- Use `update_plan_checklist_tool` to mark steps as completed
- Use `read_plan_checklist_tool` to check current status

### Important Instructions
- Don't Leave any placeholders in the code.
- Do NOT mark compilation and testing as complete unless EVERY test case is passing. Double-check that all test cases have passed successfully before updating the checklist. If even a single test case fails, compilation and testing must remain incomplete.
- Do not mark the step as completed until all the sub-steps are completed.

---
*This checklist is automatically maintained. Update status as you complete each step using the provided tools.*