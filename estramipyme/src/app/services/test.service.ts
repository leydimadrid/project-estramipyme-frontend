import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_CONSTANTS } from "../config/constants";
import { TestRequestDTO } from "../DTO/testRequestDTO";

@Injectable({
    providedIn: 'root',
})
export class TestService{

    private http = inject(HttpClient);

    saveTest(data: TestRequestDTO){
        let endpoint = API_CONSTANTS.BASE_URL + API_CONSTANTS.POSTTEST_ENDPOINT;
        return this.http.post(endpoint, data)
    }
   
}