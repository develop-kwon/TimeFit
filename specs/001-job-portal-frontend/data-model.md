# Data Model

## Entities

### User

- **Type**: Base entity for all users.
- **Fields**:
  - `id`: Unique identifier (e.g., UUID)
  - `email`: String (unique, validated format)
  - `password`: String (hashed)
  - `role`: Enum ('JOB_SEEKER', 'EMPLOYER')
  - `contact`: String
  - `address`: String
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp

### JobSeekerProfile

- **Type**: Extends User for job seekers.
- **Fields**:
  - `userId`: Foreign Key to User
  - `name`: String
  - `jobCategories`: Array of Strings (multi-select, tags)
  - `schedule`: Array of Schedule objects
  - `applications`: Array of Application objects

### EmployerProfile

- **Type**: Extends User for employers.
- **Fields**:
  - `userId`: Foreign Key to User
  - `companyName`: String
  - `jobPostings`: Array of Job Posting objects

### JobPosting

- **Type**: Represents a job opening.
- **Fields**:
  - `id`: Unique identifier (e.g., UUID)
  - `employerId`: Foreign Key to EmployerProfile
  - `title`: String
  - `description`: String
  - `location`: String
  - `salaryRange`: String (e.g., "$15-20/hr")
  - `requiredSkills`: Array of Strings
  - `applicationDeadline`: Date
  - `postedDate`: Date
  - `startDate`: Date
  - `startTime`: Time
  - `endTime`: Time
  - `isLongTerm`: Boolean
  - `industry`: String
  - `employmentType`: String (e.g., "Full-time", "Part-time")
  - `activePostingsLimit`: Integer (Max 500 per employer)
  - `applicants`: Array of Application objects

### Schedule

- **Type**: Represents a job seeker's available work time.
- **Fields**:
  - `id`: Unique identifier
  - `date`: Date
  - `startTime`: Time
  - `endTime`: Time
  - `isAvailable`: Boolean ('근무 가능' toggle)

### Application

- **Type**: Represents a job application.
- **Fields**:
  - `id`: Unique identifier
  - `jobPostingId`: Foreign Key to JobPosting
  - `jobSeekerId`: Foreign Key to JobSeekerProfile
  - `applicationDate`: Timestamp
  - `status`: Enum ('Submitted', 'Screening', 'First Interview', 'Second Interview', 'Final Interview', 'Offered', 'Declined Offer', 'Hired', 'Withdrew')
