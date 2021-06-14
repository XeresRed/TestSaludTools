import { HttpErrorResponse } from '@angular/common/http'


export class HttpHandler {
    private error: HttpErrorResponse;

    constructor(error: HttpErrorResponse) { this.error = error }

    getHttpError(): string {
        switch(this.error.status) {
            case 0:
                return 'No hay conexión con el servidor';
            case 400:
                return this.error.error?.errors ? [...this.error.error?.errors.map( (e: any) => e.msg)].join('\b') : 'Los datos ingresados son erroneos';
            case 401:
                return 'Su token al parecer ha expirado';
            case 500:
                return 'Ha ocurrido un error con el servidor';
            default:
              return 'No hay conexión con el servidor';
        }
    }

}
