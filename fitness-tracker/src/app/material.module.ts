import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports:[
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule, 
        MatIconModule
    ],
    exports:[
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
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