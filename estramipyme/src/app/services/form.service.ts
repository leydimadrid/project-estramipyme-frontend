import { inject, Injectable } from "@angular/core";
import { API_CONSTANTS } from "../config/constants";
import { Form } from "@models/form.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class FormService{

    private http = inject(HttpClient);

    getForms(){
        let endpoint = API_CONSTANTS.BASE_URL + API_CONSTANTS.GETFORMS_ENDPOINT;
        return this.http.get<Form[]>(endpoint)
    }
   
}