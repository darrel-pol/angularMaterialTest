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
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelect,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    imports:[
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule, 
        MatIconModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    exports:[
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,        
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})
export class MaterialModule{}