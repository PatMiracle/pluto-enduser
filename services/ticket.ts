import { useApiQuery } from "@/hooks/useApiQuery";

type TicketStatus = "PENDING" | "UNDER_REVIEW" | "CLOSED" | "RESOLVED";

type StaffStatus = "ACTIVE" | "INACTIVE";
type Gender = "MALE" | "FEMALE" | "UNSPECIFIED";
type MaritalStatus = "SINGLE" | "MARRIED" | "UNSPECIFIED" | string;
type EmergencyGender = "MALE" | "FEMALE" | "UNSPECIFIED";

interface CustomData {
  pickupLocationId: number;
  affectedAddress: string;
  serviceRequestId: number;
}

interface Staff {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: StaffStatus;
  id: string;
  email: string;
  isStaff: boolean;
  photoURL: string;
  needsAccountSetup: boolean;

  companyName: string;
  companyCACRegNumber: string;
  companyAddress: string;

  staffCode: string;
  timeZone: string;

  organizationName: string;
  organizationCACRegNumber: string;
  organizationAddress: string;

  workStartTime: string;
  workEndTime: string;
  currentProgress: string;
  staffEmploymentMode: string;

  supervisor: Supervisor;

  emergencyContactRelationship: string;
  emergencyContactName: string;
  emergencyContactAddress: string;
  emergencyContactPhone: string;

  staffMaritalStatus: MaritalStatus;
  staffDOB: string;
  dateOfHire: string;

  streetAddress: string;
  residentLGAId: number;
  residentLGAName: string;
  residentStateId: number;
  residentStateName: string;

  employmentID: string;
  gender: Gender;

  staffPOB: string;
  homeTown: string;
  workPhone: string;
  workEmail: string;

  emergencyContactFirstName: string;
  emergencyContactMiddleName: string;
  emergencyContactGender: EmergencyGender;
  emergencyContactLastName: string;
  emergencyContactEmail: string;

  additionalNotes: string;

  roles: StaffRole[];
}

interface Supervisor {
  staffId: string;
  staffName: string;
  photoURL: string;
  staffCode: string;
}

interface StaffRole {
  dateCreated: string;
  lastModified: string;
  staffRoleID: number;
  staffId: string;
  role: "TECHNICIAN" | "ADMIN" | "SUPPORT" | string;
  staffStation: number;
  staffState: number;
  staffZone: number;
  staffLandmark: number;
}

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: StaffStatus;
  id: string;
  email: string;
  isStaff: boolean;
  photoURL: string;
  needsAccountSetup: boolean;
}

type TicketType =
  | "ISSUE"
  | "IT_SUPPORT"
  | "CONSULTATION"
  | "ENVIRONMENTAL_HAZARD"
  | "APPLICATION_ISSUES"
  | "ADMIN_IT_SUPPORT";

interface IssueType {
  issueTypeId: number;
  ticketType: TicketType;
  issueTypeName: string;
}

interface TicketImage {
  imageURL: string;
  imageId: number;
  description: string;
}

interface TicketResolution {
  meansOfContact: string;
  reporterContacted: boolean;
  resolutionActionTaken: string;
  completelyResolved: boolean;
}

export interface TicketResponse {
  start: number;
  count: number;
  total: string;
  done: boolean;
  data: Ticket[];
  pagination: Pagination;
}

export interface Ticket {
  dateCreated: string;
  lastModified: string;
  clientId: string;
  firstName: string;
  ticketCode: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  title: string;
  description: string;
  issueTypeId: number;
  customData: CustomData;
  ticketId: number;
  feedback: string;
  action: string;
  status: TicketStatus;
  priority: string;
  assignedStaffId: string;
  assignedStaff: Staff;
  user: User;
  issueType: IssueType;
  images: TicketImage[];
  resolution: TicketResolution;
}

interface Params {
  pageSize?: number;
}

export const useTickets = (p: Params) =>
  useApiQuery<TicketResponse>("issues", "/user/issues", p);
