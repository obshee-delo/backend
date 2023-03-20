import { ApiAdapter } from "./adapter";
import { CourseService } from "./modules/course";
import { PaymentService } from "./modules/payments";
import { UserService } from "./modules/user";


export class ApiGateway {
    private adapter: ApiAdapter;

    public user: UserService;
    public course: CourseService;
    public payment: PaymentService;

    constructor(adapter: ApiAdapter) {
        this.adapter = adapter;

        this.user = new UserService(adapter);
        this.course = new CourseService(adapter);
        this.payment = new PaymentService(adapter);
    }
}
