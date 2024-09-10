package Utils;


import io.restassured.RestAssured;
import io.restassured.response.Response;

public class RestAPIClient {
    public static boolean validateDataTransmission() {
        Response response = RestAssured.get("https://www.qamentor.com/wp-json/contact-form-7/v1/contact-forms/41967/feedback/schema");
        // Assuming the downstream system sends a 200 OK response if data is correctly received
        return response.getStatusCode() == 200;
    }
}
