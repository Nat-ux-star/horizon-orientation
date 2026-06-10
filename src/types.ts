export interface Destination {
  id: string;
  name: string;
  regions: string;
  focus: string;
  details: string[];
  scholarships: string;
  requirements: string;
}

export interface FormulaPackage {
  name: string;
  price?: string;
  tagline: string;
  features: string[];
  popular: boolean;
  color: string;
}

export interface Dossier {
  id: string;
  fullName: string;
  whatsappNumber: string;
  status: string;
  step: number;
  adminNotes: string;
  lastUpdated: string;
  currentClass: string;
  interestedFields: string;
}
