import { Sector } from '../enums/Sector.enum';
import { TypeDocument } from '../enums/typedocument.enum';
import { TypeUser } from '../enums/typeuser.enum';

export interface RegisterDataModel {
  confirmPassword: string;
  id: number;
  name: string;
  lastname: string;
  typeUser: TypeUser;
  typeDocument: TypeDocument;
  numberDocument: string;
  businessName: string; // Solo será relevante si es un tipo de usuario LEGAL
  sector: Sector;
  otherSector: string;
  email: string;
  password: string;
}
