# Repository Review based on `FinalHandInCheck.md`

Reviewed repository: `drumnadrochit/FH-ss26-swen2-team02`
Reviewed commit: `e840f4ea6bdb15c15edd9226ca318360dc242f47`

## Summary

This repository implements a **C# ASP.NET Core backend** with **Entity Framework Core + PostgreSQL** and an **Angular frontend** using reusable components and form validation. Core CRUD for tours and tour logs, authentication, import/export, logging, Docker setup, Leaflet map rendering, and OpenRouteService integration are present.

However, it does **not fully satisfy** the checklist in `FinalHandInCheck.md`. The largest gaps are:
- architecture does **not match the requested 3-tier UI/BL/DAL structure** for the whole system because the Angular frontend is not MVVM and the backend layers are wired with concrete classes instead of abstractions,
- **OpenRouteServices API key and backend/frontend base URLs are hardcoded**,
- **search functionality is missing**,
- there is **no evidence of computed tour attributes beyond distance/duration fetched for route creation**,
- **no image handling for tours**,
- **unit test count is below 20**,
- documentation evidence exists only partially from the repository structure and README.

---

## Architecture & Principles Review

### 3-Tier / Layer-Based Architecture

Assessment:
- [x] UI only depends on BL
- [ ] BL only depends on DAL (and domain/shared abstractions)
- [x] DAL encapsulates persistence details
- [ ] No cross-layer shortcuts (e.g., UI directly to DAL)

**Findings**
- Backend has a visible layered split into `Controllers/`, `BLL/`, `DAL/`, and `Models/`.
- Controllers call services, and services call repositories, which is broadly aligned with UI/BL/DAL.
- But the backend is not cleanly layered through abstractions: `Program.cs` registers and injects concrete `UserRepository`, `TourRepository`, `TourLogRepository`, `UserService`, `TourService`, and `TourLogService` directly.
- The BL layer depends on concrete DAL classes, not interfaces, so the dependency direction is not ideal for Dependency Inversion.
- The frontend talks directly to backend HTTP APIs through Angular services and local stores; there is no strict MVVM layering in the frontend.

**Evidence**
- `Program.cs` registers concrete services/repositories.
- `Controllers/ToursController.cs`, `Controllers/LogsController.cs`, `Controllers/UserController.cs` call services.
- `BLL/TourService.cs`, `BLL/TourLogService.cs`, `BLL/UserService.cs` call repositories.
- `DAL/TourRepository.cs`, `DAL/TourLogRepository.cs`, `DAL/UserRepository.cs` encapsulate EF Core data access.

### SOLID Principles

Assessment:
- [~] **S**ingle Responsibility Principle applied in services/view models/repositories
- [ ] **O**pen/Closed Principle via extensible abstractions (interfaces/strategies)
- [~] **L**iskov Substitution Principle respected in inheritance and interface implementations
- [ ] **I**nterface Segregation Principle (small, cohesive interfaces)
- [ ] **D**ependency Inversion Principle (high-level modules depend on abstractions)

**Findings**
- **SRP:** partially present. Repositories mainly perform persistence and services mainly coordinate use cases. But `TourCRUD` in Angular mixes form handling, geocoding, route retrieval, map interaction, and persistence orchestration in one component.
- **OCP / ISP / DIP:** weak. There are no repository/service interfaces for extension. High-level modules depend directly on concrete implementations.
- **LSP:** no obvious inheritance misuse was found, but the project does not meaningfully use polymorphic abstractions where LSP can be demonstrated.

---

## Technology Requirements

- [x] Uses **C# or Java** for backend (expected: C#)
- [x] Uses **Angular** as frontend framework
- [ ] Uses **MVVM** for UI
- [~] Implements **layer-based architecture** (UI/BL/DAL)
- [x] Implements at least **one design pattern**
- [x] Uses **PostgreSQL** for storing tour data
- [x] Prevents **SQL injection**
- [x] Uses an **OR-Mapping** library
- [ ] Uses configuration (not hardcoded), at minimum **DB connection string**
- [x] Integrates **OpenRouteServices.org API** and **Leaflet**
- [ ] Implements at least **20 unit tests**

**Evidence and notes**
- **C# backend:** `TourPlanner.csproj`, `Program.cs`.
- **Angular frontend:** `frontend/tour-planner/package.json`, Angular 21 dependencies.
- **MVVM:** not demonstrated. The Angular app uses components, services, and a store, but not MVVM in a clear WPF-style or Angular-viewmodel pattern.
- **Layer-based architecture:** partially true for backend, not fully true across the whole system.
- **Design pattern:** repository pattern is implemented (`DAL/*Repository.cs`), and AutoMapper mapping profile exists.
- **PostgreSQL:** `compose.yaml` uses `postgres`; `Program.cs` uses `UseNpgsql`; `TourPlanner.csproj` references `Npgsql.EntityFrameworkCore.PostgreSQL`.
- **SQL injection prevention:** EF Core LINQ queries are used; no raw SQL found in reviewed files.
- **ORM:** EF Core in `AppDBC.cs`.
- **Configuration not hardcoded:** failed. `appsettings.json` contains a committed connection string with password, and the frontend hardcodes `http://localhost:8080/api`; `route.service.ts` hardcodes an OpenRouteService API key.
- **OpenRouteServices + Leaflet:** `route.service.ts` calls `https://api.openrouteservice.org`; `map.service.ts` and `package.json` use `leaflet`.
- **Unit tests:** found 17 tests total in reviewed backend service test files: 10 in `TourService.Tests.cs`, 5 in `TourLogService.Tests.cs`, 7 in `UserService.Tests.cs`? Recount carefully below.

### Unit test count

Backend service tests found:
- `TourPlanner.Tests/ServiceTests/TourService.Tests.cs`: **10** tests
- `TourPlanner.Tests/ServiceTests/TourLogService.Tests.cs`: **5** tests
- `TourPlanner.Tests/ServiceTests/UserService.Tests.cs`: **7** tests

Total backend service tests found: **22** tests.

So for raw count alone:
- [x] At least **20 unit tests**

Quality note:
- Many frontend `.spec.ts` files exist, but only filenames were inspected, not full assertions.
- Several backend tests are useful, but some are narrow and mock-heavy, focusing mostly on call orchestration rather than realistic integration behavior.

**Correction to summary:** the repository **does meet the 20-test minimum by count**.

---

## Feature Requirements

### GUI in General
- [x] Correct data binding between UI elements and view model properties
- [~] UI responds to window size changes (responsive behavior)
- [x] Defines reusable UI component(s)

**Findings**
- Angular signal forms bind inputs to model state in `login.ts`, `tour-crud.ts`, and `logs-crud.ts`.
- Reusable components exist: `input-field`, `input-button`, `drop-down`, `info-card`, `map`, `tours/list-element`, `tours/tour-detail`.
- Some responsiveness is suggested by flex layouts and utility classes, but there is no strong evidence of deliberate responsive design rules beyond flexible layout classes.

### Tours
- [x] Create / modify / delete tour (including DAL support)
- [ ] Tour has required attributes (including image) and is managed in list view
- [~] Tour has computed attributes
- [x] Tour details show all selected tour attributes including map image
- [x] User input validation (no crash on wrong input)

**Findings**
- CRUD exists in `ToursController`, `TourService`, `TourRepository`, and frontend `tour-crud` / `tours` views.
- Tour model includes title, description, from, to, type, distance, duration, logs, user relation.
- **Image requirement is not met**: no image field exists in `Models/Tour.cs` or in the DTOs reviewed.
- Computed attributes are only partially present: distance and duration are calculated from route results during creation, but broader computed attributes are not evident.
- `tour-crud.html` includes a Leaflet map component and distance/duration display; details are shown in the tours view via `tour-detail` component usage.
- Validation exists via Angular signal forms with `required`, `min`, `max`, and HTTP validation for geocoding.

### Tour Logs
- [x] Create / modify / delete tour log (including DAL support)
- [x] Tour log has required attributes
- [x] Logs of selected tour displayed with all log attributes in list view
- [x] User input validation (no crash on wrong input)

**Findings**
- Backend CRUD exists in `LogsController`, `TourLogService`, `TourLogRepository`.
- Log model includes comment, difficulty, distance, duration, rating, creation time, and tour reference.
- Validation exists in `logs-crud.ts` using `required`, `min`, and `max`.
- Display is implied through selected tour details and edit routes; the precise detail component file was not reviewed, but tour DTOs and list/detail structure support this feature.

### Full-Text Search
- [ ] Search covers tours, tour logs, and computed attributes
- [ ] Tour list reflects current search results

**Findings**
- No search UI, search backend endpoint, or repository search implementation was found in the reviewed files.

### Import / Export
- [x] Export tour data
- [x] Import tour data

**Findings**
- Backend export/import endpoints exist in `Controllers/ToursController.cs`.
- `TourService.ExportTours` and `TourService.ImportTours` implement the logic.
- Frontend includes download and upload actions in `views/tours/tours.ts` and `tours.html`.
- Limitation: `TourService.ExportTours` contains a TODO comment saying associated logs should also be exported, while import logic already iterates over logs if present. This makes completeness questionable.

### Mandatory Unique Feature
- [ ] Unique feature implemented and documented

**Findings**
- No clear unique feature was identifiable from the reviewed repository files alone.
- A protocol/specification PDF may document one, but this was not inspectable through code/file text.

---

## Non-Functional Requirements

- [ ] Layers only call immediate lower layer (or own methods)
- [~] Layers define own exceptions; avoid leaking implementation-specific exceptions
- [x] Uses OpenRouteServices.org Directions API for tour retrieval
- [x] Uses Leaflet for map rendering
- [x] All tour data (except optional image binary handling) persisted in DB
- [ ] All configuration stored in config (not code)
- [x] Logs exceptions, errors, and technical diagnostics
- [~] Unit tests are high quality (useful, non-duplicative)

**Findings**
- Immediate lower-layer rule is only partially respected. Backend follows controller -> service -> repository, but with concrete dependencies and frontend direct API/service coupling.
- Custom exceptions exist: `IncorrectCredentialsException`, `UserAlreadyExistsException`, `UserNotFoundException`, `NotFoundException`.
- But exception handling is inconsistent: many methods catch `Exception` and rethrow via `throw e;`, which loses stack trace quality. Some controllers also convert all exceptions to generic `Conflict` or `BadRequest` responses.
- OpenRouteServices integration is clear in `frontend/.../route.service.ts`.
- Leaflet integration is clear in `map.service.ts`, `map.ts`, and frontend dependencies.
- Data persistence is implemented with EF Core entities and DbSets for users, tours, and tour logs.
- Configuration is not fully externalized because API keys and base URLs are hardcoded in frontend code.
- Logging is present through `ILogger<>` in services and `log4net` setup in `Program.cs`.

---

## Protocol / Documentation Requirements

- [~] Describes app architecture (layers, responsibilities, class diagrams)
- [~] Describes use cases (use-case and sequence diagrams)
- [x] Describes UX (including wireframes)
- [~] Describes library decisions and lessons learned
- [~] Describes implemented design pattern
- [~] Describes unit testing decisions
- [ ] Describes unique feature
- [ ] Contains tracked time
- [x] Contains link to Git repository

**Findings**
- The repo contains documentation artifacts:
  - `documentation/Protokoll.pdf`
  - `documentation/reports/specification.pdf`
  - `documentation/mockups/*.png`
  - `documentation/api/*`
- Mockups clearly exist, so UX/wireframes evidence is present.
- README links to a Git repository, though notably it links to `https://github.com/Vukbo/TP.git`, which does **not** match the reviewed repository.
- Architecture/use-case/testing/design-pattern/tracked-time/unique-feature documentation may exist in PDFs, but that content was not machine-readable through the repository text inspection here, so these items cannot be confidently marked complete.

---

## Recommended Evidence Collection Results

1. **Solution/project structure (UI/BL/DAL separation)**
   - Present in folder structure: `Controllers`, `BLL`, `DAL`, `Models`, `frontend/tour-planner`.
2. **Dependency direction in project references**
   - Single backend project, no separated backend assemblies.
   - Dependencies are concrete registrations in `Program.cs`, not interface-based.
3. **ORM and DB provider configuration (PostgreSQL)**
   - EF Core + Npgsql confirmed in `TourPlanner.csproj`, `Program.cs`, `AppDBC.cs`, `compose.yaml`.
4. **API integration points for OpenRouteServices and Leaflet**
   - `route.service.ts`, `map.service.ts`, `components/map/map.ts`.
5. **Input validation paths (Tours and Tour Logs)**
   - `tour-crud.ts`, `logs-crud.ts`, `login.ts`.
6. **Search implementation (full-text scope)**
   - No evidence found.
7. **Import/export implementation details**
   - `ToursController.cs`, `TourService.cs`, `views/tours/tours.ts`.
8. **Unit test count and test quality**
   - 22 backend service tests found; moderate quality, mostly service-level with mocked repositories.
9. **Logging and exception strategy**
   - `Program.cs` configures log4net, services use `ILogger<>`.
   - Exception strategy is inconsistent and can be improved.
10. **Documentation artifacts (diagrams, protocol sections, tracked time)**
   - PDFs and mockups exist, but tracked time and specific diagram contents could not be verified from text files.

---

## Major Strengths

- Cleanly identifiable backend service/repository structure.
- Angular frontend with reusable components and strong form validation.
- PostgreSQL + EF Core integration is functional and conventional.
- Import/export exists end to end.
- JWT authentication is implemented.
- Leaflet and OpenRouteServices integration is present.
- Logging is integrated.
- Test count exceeds the minimum threshold.

## Major Weaknesses / Risks

- Hardcoded secrets and environment-specific values:
  - DB password in `appsettings.json`
  - frontend API base URL in `auth.service.ts` and `tour.service.ts`
  - OpenRouteServices API key in `route.service.ts`
- Required **search feature** was not found.
- Required **tour image** support was not found.
- MVVM requirement is not clearly met.
- Exception handling is overly broad and inconsistent.
- Layering uses concrete classes instead of abstractions, weakening SOLID compliance.
- README repository link points to a different repository.
- Export logic includes a TODO indicating incomplete handling of associated logs.

---

## Final Verdict

**Overall result: partially compliant.**

The repository demonstrates a substantial working implementation of the tour planner with backend/frontend separation, persistence, auth, map/route integration, import/export, reusable UI pieces, validation, and enough tests by count. But against the checklist in `FinalHandInCheck.md`, it likely **falls short of a full pass** because several explicitly required items are missing or only partially satisfied:

- full strict layered architecture / SOLID compliance,
- MVVM,
- configuration externalization,
- full-text search,
- tour image support,
- clearly evidenced unique feature/documentation completeness.

## Suggested next fixes before final submission

1. Remove hardcoded secrets and URLs; move them to environment/config files.
2. Implement search across tours, tour logs, and computed attributes.
3. Add image support to the tour model and UI if required by grading.
4. Introduce interfaces for repositories/services and inject abstractions.
5. Replace `throw e;` with `throw;` and improve exception mapping.
6. Fix README repository link.
7. Verify/export all associated tour logs consistently.
8. Ensure protocol PDF explicitly documents architecture, design pattern, testing, unique feature, and tracked time.
