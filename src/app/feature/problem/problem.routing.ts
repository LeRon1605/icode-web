import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProblemManagerComponent } from "./pages/problem-manager/problem-manager.component";
import { RoleAuthGuard } from "src/app/core/guards/role-auth.guard";
import { CreateProblemComponent } from "./pages/create-problem/create-problem.component";

const routes: Routes = [
    {
        path: '',
        component: ProblemManagerComponent,
        canActivate: [RoleAuthGuard],
        data: {
            role: 'Admin'
        }
    },
    {
        path: 'insert',
        component: CreateProblemComponent,
        canActivate: [RoleAuthGuard],
        data: {
            role: 'Admin'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProblemRoutingModule { }