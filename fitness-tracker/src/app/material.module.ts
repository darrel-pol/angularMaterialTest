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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports:[
        MatPaginatorModule,
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
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule
    ],
    exports:[
        MatPaginatorModule,
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
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatSnackBarModule
    ]
})
export class MaterialModule{}