let globalbudget='';
let categories_array = ['housing','transportation','food','pets','entertainment','loans','savings'];

let housing_subtotal=0;
let transportation_subtotal=0;
let food_subtotal =0;
let pets_subtotal= 0;
let entertainment_subtotal =0;
let loans_subtotal=0;
let savings_subtotal=0;
let budget_total =0;

document.addEventListener('DOMContentLoaded', ()=>{
    //function that loads all of the different budgets to fill out the dropdown menu
    budget();
    
    //Here I decide what to do after the continue button is clicked.
    document.getElementById("new_budget_continue").onclick = function() {
        //Here we call the function that will get the value of the current budget and will load
        //the categories respectively
        budgetSelection()
        //Hiding the budget div
        document.querySelector("#budget_div").style.display="none";
        document.querySelector("#welcome_div").style.display="none";

        //removing the display:none attribute from the categories div and showing it
        document.querySelector("#categories_div").style.display="flex";
        //Showing the Header
        document.querySelector("#header").style.display="block";
        for(let i =0;i<categories_array.length;i++){
            let title = categories_array[i];
            //Capitalizing the title 
            let capitalized_title = title.charAt(0).toUpperCase() + title.slice(1);
            const categories = document.createElement('div');
            categories.innerHTML='';
            let categories_div = document.querySelector('#categories_div');
            categories.innerHTML= `<div class="categories" id="${title}">
                                    <div><h2 class="categories_title">${capitalized_title}</h2></div>
                                    <div><h6 id="${title}_subtotal" class="subtotal">Subtotal:</h6></div>
                                        <div style="display:inline-flex;">
                                            <form id="${title}_new_entry_form" onsubmit="return false">
                                                <input name="title" class="new_category_input" type="text" placeholder="title">
                                                <input name="amount" class="new_category_input" type="number" placeholder="amount">
                                                <input name="category" type="hidden"  value=${capitalized_title}>
                                                <button type='button' class="btn btn-success new_category_button"  id="${title}_new_category_button">+</button
                                            </form>
                                    </div>
                                    <div class="categories_table" id="${title}_list"></div>
                                </div>`
                                    
            categories_div.append(categories);
        }
        
    };
    //Code to hide and display new budget form
    document.querySelector("#new_budget_button").addEventListener("click",()=>{
        if(document.querySelector("#budget_form_div").style.display!='block'){
            document.querySelector("#budget_form_div").style.display='block';
        }
        else{
            document.querySelector("#budget_form_div").style.display='none'; 
        }
        
    });
    
    document.addEventListener('click', event =>{
        //find what is clicked on
        const element = event.target;
        if(element.id=="housing_new_category_button" || element.id=="transportation_new_category_button" ||
           element.id=="food_new_category_button"    || element.id=="pets_new_category_button"           ||
           element.id=="entertainment_new_category_button" || element.id=="loans_new_category_button"    ||
           element.id=="savings_new_category_button")
            {
                newEntry(element);
            }
        //Implementation of the delte button
        if(element.className == "delete_entry_button"){
            let id = element.dataset.id;
            
            fetch(`/removeentry/${id}`).then(response => response.json())
            .then(data =>{
                console.log(data);
            });
            //clearing entries
            clearingEntries();
            //clearing subtotals
            clearingSubtotals();
            entries()
        }
    }); 

  
 
})

function newEntry(element){
    let title = element.parentElement.title.value;
    let amount = element.parentElement.amount.value;
    let category = element.parentElement.category.value;

  
    fetch(`/addentry/${title}/${amount}/${category}`).then(response => response.json())
    .then(data => {})
    
    //Clearing the entries
    clearingEntries();
    //clearing subtotals
    clearingSubtotals();
    element.parentElement.title.value='';
    element.parentElement.amount.value='';
    entries();
}

function budgetSelection(){
    let dropdown_value= budget_dropdown.value;
    
    globalbudget= String(budget_dropdown.value);
    

    fetch(`/budget/${dropdown_value}`)
    .then(response => response.json())
    .then(data => {
    })
    //function that loads entries
    entries();

}

//function that loads all of the different budgets to fill out the dropdown menu
function budget(){
    fetch(`/budget`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.budgets.length; i++) {
                //function that helps budget() achieve its goal
                loadBudgetchecklist(data.budgets[i].name)
                
            }
        })
}

function loadBudgetchecklist(name){
    // Create new div
    const option = document.createElement('option');
    option.innerHTML="";
    let dropdown = document.querySelector("#budget_dropdown");
    option.innerHTML =  `${name}`

    dropdown.append(option);

}

function entries(){
    
    fetch(`/budget/${globalbudget}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.entries.length; i++) {
                //function that helps budget() achieve its goal
                let category = data.entries[i].category;
                //Capitalizing the title 
                let lower_category = category.charAt(0).toLowerCase() + category.slice(1);

                //Code to add the subtotals
                for(let x = 0; x <categories_array.length; x++){
                    if(lower_category == categories_array[x]){
                        if(categories_array[x] == "housing" && data.entries[i].budget == globalbudget){
                            housing_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;
                        }
                        if(categories_array[x] == "transportation" && data.entries[i].budget == globalbudget){
                            transportation_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        if(categories_array[x] == "food" && data.entries[i].budget == globalbudget){
                            food_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        if(categories_array[x] == "pets" && data.entries[i].budget == globalbudget){
                            pets_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        if(categories_array[x] == "entertainment" && data.entries[i].budget == globalbudget){
                            entertainment_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        if(categories_array[x] == "loans" && data.entries[i].budget == globalbudget){
                            loans_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        if(categories_array[x] == "savings" && data.entries[i].budget == globalbudget){
                            savings_subtotal += data.entries[i].amount;
                            budget_total+= data.entries[i].amount;

                        }
                        
                    }
                    
                }
                
                //calling the load entries function
                loadEntries(data.entries[i].title,data.entries[i].amount,lower_category,data.entries[i].budget,data.entries[i].id,data.entries[i].date);
  
            }
            
            //Here we update the subtotals of each category
            for(let i =0;i<categories_array.length;i++){
                if(categories_array[i]=="housing"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${housing_subtotal}`
                }
                if(categories_array[i]=="transportation"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${transportation_subtotal}`
                }
                if(categories_array[i]=="food"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${food_subtotal}`
                }
                if(categories_array[i]=="pets"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${pets_subtotal}`
                }
                if(categories_array[i]=="entertainment"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${entertainment_subtotal}`
                }
                if(categories_array[i]=="loans"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${loans_subtotal}`
                }
                if(categories_array[i]=="savings"){
                    document.querySelector(`#${categories_array[i]}_subtotal`).innerHTML = `Subtotal: $${savings_subtotal}`
                }
                
            }
            //Updating the header div
            // Create new div
            const header = document.createElement('div');
            header.innerHTML="";
            let container= document.querySelector("#header");
            container.innerHTML="";
            header.innerHTML =  `<button type="button" id="budget_delete_button" onclick="confirmFunction()" class="btn btn-danger">Delete</button>
                                 <div><h2 class="header_title">${globalbudget} Budget</h2> </div>
                                 <div><h3 class="header_expenses">Monthly Income: $<mark>${data.budget.income.toFixed(2)}</mark> |
                                 Projected Expenses: $ <mark>${data.budget.projected_amount.toFixed(2)}</mark> |
                                 Total Expenses: $ <mark>${budget_total.toFixed(2)}</mark> |
                                 Money Left: $ <mark>${(data.budget.income-budget_total).toFixed(2)}</mark></h3></div>`

            container.append(header);
        })
        
}
function loadEntries(title,amount,category,budget,id,date){

    // Create new div
    const entry = document.createElement('table');
    entry.innerHTML="";
    new_date= new Date(date);
    new_date_string = ""
    month = new_date.getMonth()+1;
    year = new_date.getFullYear();
    day = new_date.getDate();
    new_date_string = month + "/" + day +"/" + year;

    let container = document.querySelector(`#${category}_list`);
    entry.innerHTML =  `<tr class="entries_table"><td>${title}</td><td>${new_date_string}</td><td>$${amount.toFixed(2)}</td><td><button data-id=${id} class="delete_entry_button" ></button></td></tr>`
    if(budget ==globalbudget){
        container.append(entry);
    }
   

}

function clearingEntries(){
      //Clearing the entries
      for(let i =0;i< categories_array.length;i++){
        document.querySelector(`#${categories_array[i]}_list`).innerHTML='';
    }
}
function clearingSubtotals(){
    budget_total = 0;
    housing_subtotal=0;
    transportation_subtotal=0;
    food_subtotal =0;
    pets_subtotal= 0;
    entertainment_subtotal =0;
    loans_subtotal=0;
    savings_subtotal=0;
}
function confirmFunction() {
    if (confirm("You can't revert changes. Are you sure you want to delete?") == true) {
        fetch(`/deletebudget/${globalbudget}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.reload();
        })
    } else {
       return false;
    }
}