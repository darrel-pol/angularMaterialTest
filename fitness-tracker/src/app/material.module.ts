import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
} from '@angular/material';

@NgModule({
    imports:[
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule, 
        MatIconModule
    ],
    exports:[
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule,
        MatIconModule
    ]
})
export class MaterialModule{}