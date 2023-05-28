import { QA, UAT } from '../../utils/testConfig';

export class Enviroment {
    private readonly env: any;

    constructor(ENV: string) {
        switch (ENV) {
            case 'qa':
                this.env = QA;
                break;
            case 'uat':
                this.env = UAT;
                break;
            default:
                throw new Error('${ENV} is and invalid argument. Please Try again. Example: "npx ENV=uat|qa npm run test"');
        }
    }

    public get baseURL(): string {
        return this.env.baseURL;
    }

    public get username(): string {
        return this.env.username;
    }

    public get password(): string {
        return this.env.password;
    }

    public get data(): any {
        return this.env.data;
    }
}
