import Swal from 'sweetalert2';

export class Alert {

    public static mostrarAlertError(title: string, text: string) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text
        });
    }

    public static mostrarAlertInfo(title: string, text: string) {
        Swal.fire({
            icon: 'info',
            title: title,
            text: text
        });
    }

    public static mostrarAlertSuccess(title: string, text: string) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text
        });
    }
}