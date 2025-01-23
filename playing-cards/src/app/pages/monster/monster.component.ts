import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import{MatButtonModule} from '@angular/material/button'
import{MatInputModule} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
	selector: 'app-monster',
	standalone: true,
	imports: [ReactiveFormsModule,PlayingCardComponent,MatButtonModule,MatInputModule,MatSelectModule],
	templateUrl: './monster.component.html',
	styleUrl: './monster.component.css'
})

export class MonsterComponent implements OnInit {

	private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb=inject(FormBuilder);
  monsterServices = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  formGroup =  this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]]
  });

  monster:Monster = Object.assign(new Monster(),this.formGroup.value);
  monsterTypes = Object.values(MonsterType)
  

  routeSubscription: Subscription | null = null;
  private formValueSubsription: Subscription | null = null;
	monsterId = -1


	ngOnInit(): void {
    this.formValueSubsription = this.formGroup.valueChanges.subscribe(data =>{
      this.monster=Object.assign(new Monster(),data);
    })
		this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.monsterId = parseInt(params['id']);
        const monsterFound = this.monsterServices.get(this.monsterId);
        if(monsterFound){
          this.monster=monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
		
	}

  ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
    this.formValueSubsription?.unsubscribe();	
  }

  next(){
    let nextId = this.monsterId||0;
    nextId++;
    this.router.navigate(["monster/"+nextId])
  }

  submit(event:Event){
    event.preventDefault();
    if(this.monsterId==-1){
      console.log("add")
      this.monsterServices.add(this.monster);
    }
    else{
      console.log("update")
      
      //on recup l'id qui n'est pas dans le form
      this.monster.id=this.monsterId;
 
      this.monsterServices.update(this.monster);
    }
    

    
    this.navigateBack();

 
  }

  isFieldValid(name:string){
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file); 
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  navigateBack(){
    this.router.navigate(["/home"])
  }
  
  deleteMonster() {
		const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
		dialogRef.afterClosed().subscribe(confirmation => {
			if (confirmation) {
				this.monsterServices.delete(this.monsterId);
				this.navigateBack();
			}
		})
	}
}
