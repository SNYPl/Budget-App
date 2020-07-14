const backController = (function () {

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }

    let data = {
        all: {
            inc: [],
            exp: []
        },
    }
    let totalIncomes = [0];
    let totalExpanses = [0];
    



    return {



           
        itemAdded: function (type = 'inc', des = "", val = 0) {
            let newItem, ID;
            

            if (data.all[type].length > 0) {
                ID = data.all[type][data.all[type].length -1].id+1;
            } else {
                ID = 1;
            }
                              
            
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);

            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            data.all[type].push(newItem)
                  
            return newItem;
        },

       

        testdata: function () {
            console.log(data);
            console.log(totalIncomes);
            console.log(totalExpanses);
            

        },

        addToTotalInc : function (idNum) {
            let dataInc = data.all.inc[idNum].value
            totalIncomes.push(parseInt(dataInc));
            console.log(totalIncomes);
        },


        AddTotalExp : function (idNum) {

        let dataExp = data.all.exp[idNum].value
        totalExpanses.push(parseInt(dataExp));           
            console.log(totalExpanses);
        },


        totalUi : function (type) {

            let totinc = totalIncomes.reduce((acc,cur)  =>  acc+cur);
            let totexp = totalExpanses.reduce((acc,cur)  =>  acc+cur);
            // let totals = totinc - totexp;
            let totals;
          
                totals= totinc -  totexp;
          
            
           
                document.getElementById("budget-value").textContent=`${parseInt(totals)}`;



                if(document.getElementById("budget-value").textContent < 0) {
                    document.querySelector(".Change").textContent="";
                    document.getElementById("budget-value").style.color="#e6082d";
                    document.getElementById("bd").style.color="#e6082d";
                } else if (document.getElementById("budget-value").textContent > 0) {
                    document.querySelector(".Change").textContent="+";
                    document.getElementById("budget-value").style.color="#fff";
                    document.getElementById("bd").style.color="#fff";
                    document.querySelector(".Change").style.color="#fff";
                }

                      
        },


        addToElementInc : function () {
            let incomeDiv = document.getElementById("incomes");
            let parsInc =  parseInt(incomeDiv.textContent);
            for(i =0; i <data.all.inc.length;i++) {
                 incomeDiv.textContent =`${parsInc + parseInt(data.all.inc[i].value)}`;
                }
        },



        addToElementExp : function () {
            let expenseDiv = document.getElementById("expenses");
            let parsExp =  parseInt(expenseDiv.textContent);

                for(i =0; i <data.all.exp.length;i++) {
                 expenseDiv.textContent =`${parsExp + parseInt(data.all.exp[i].value)}`;
                   
                }
        },




        addId: function (type) {
        
          let ID =data.all[type][data.all[type].length -1].id;
           let typ = ID

        return typ;
        },

        newIncId:function () {
            let eb = 0;
             eb = data.all.inc.length -1;

            return eb;
        },


        newExpId:function () {
            let eb = 0;
             eb = data.all.exp.length -1;

            return eb;
        },


        deleteTotal:function(id) {
            
            totalIncomes.splice(id,id );
            let ta;
            ta = totalIncomes;


            return ta;
        },


        deleteFromData : function (ty, id) {
            let ids, index;

            ids=data.all[ty].map(function(current) {

                return current.id;

            });

            index= ids.indexOf(id);

            if(index !== -1) {
                data.all[ty].splice(index, 1);


                if (ty == "inc") {
                    totalIncomes.splice(index +1,1);
                    
                }else if (ty=="exp") {
                    totalExpanses.splice(index +1,1);
                  
                }
               

            }


        },

        deleteFromUi:function (select) {
            let selector = document.getElementById(select);
            // let vnaxot =  document.querySelector(".del1");

            // vnaxot.parentElement.parentNode.parentElement.parentNode.remove(select);
            selector.parentNode.removeChild(selector);


            


        },




        deletedInc:function(type) {

            
            
            let btn1 =  document.querySelector(".container__income");

 
            btn1.addEventListener("click", function(event) {
                let itemId, splitId, type , id;
                
                itemId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                if(itemId) {

                    splitId = itemId.split("-");
                    type=splitId[0];
                    id=parseInt(splitId[1]);
                    backController.deleteFromData(type,id)
                    backController.deleteFromUi(itemId);
                    
                    backController.totalUi();

                  
                }

               

          
               
            }); 
            

        },





        deletedExp:function(type) {

           
            
            let btn1 =  document.querySelector(".container__expanse");

 
            btn1.addEventListener("click", function(event) {
                let itemId, splitId, type , id;
                
                itemId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                if(itemId) {
                
                    splitId = itemId.split("-");
                    type=splitId[0];
                    id=parseInt(splitId[1]);

                    backController.deleteFromData(type,id)
                    backController.deleteFromUi(itemId);
                    

                    backController.totalUi();

                }

               

          
               
            }); 
            

        },


    }

})();


const uiInterface = (function () {

    let domStrings = {
        type: ".add--type",
        des: ".add--description",
        val: ".add--value"
    }


    return {
        getStrings: function () {
            return domStrings;
        },


        getInputs: function () {
            return {
                type: document.querySelector(domStrings.type).value,
                desc: document.querySelector(domStrings.des).value,
                val: document.querySelector(domStrings.val).value


            }
        },

        addIncome: function (type, id, description, value, mp,cls, btn,del) {

             document.querySelector(`${type}-list`).insertAdjacentHTML('afterbegin', ` <div class="item " id=${id}>
                <div class="item__description">${description}</div>
                            <div class="right">
                       <div class="item__value">
                        <div class="minus" id="minus">${mp}</div>
                                ${value}
                                <div>.00</div>

                                <div class="item__delete visibled ${btn}">
                                <button class="item__delete--btn ${del}">
                                <i class="gg-close-o ${cls}"></i>
                                </button>
                                </div>

                        </div>
                   </div>
               </div>`)
            id ++;
        },


        clearfields: function () {

            document.querySelector(domStrings.des).value="";
            document.querySelector(domStrings.val).value ="";

            document.querySelector(domStrings.des).focus();
        },







    }

    

})();






const controller = (function (budgeContr, UiContr) {
    

    document.getElementById("incomes").textContent=0;
    document.getElementById("expenses").textContent=0;

    let addItem = function () {
       
        if (document.querySelector(".add--description").value.length === 0 || document.querySelector(".add--value").value.length===0) {
            event.preventDefault();
    }else {
            // Get Inputs
        let addInput = UiContr.getInputs();

        // Add New Item
        let addItems = budgeContr.itemAdded(addInput.type, addInput.desc, addInput.val)

        console.log(addItems);
        

        //add item to UI
        let adInp = function () {
            if (addInput.type == 'inc') {
                UiContr.addIncome('.income', `inc-${budgeContr.addId(addInput.type)}`, addInput.desc, addInput.val, `+`,"blue","btn-inc","del1");              
                budgeContr.addToTotalInc(budgeContr.newIncId());
                budgeContr.addToElementInc();
             
                budgeContr.deletedInc(addInput.type);
            } else if (addInput.type == 'exp') {
                UiContr.addIncome('.expanse', `exp-${budgeContr.addId(addInput.type)}`, addInput.desc, addInput.val, `-`,"red", "btn-exp","del2");
                budgeContr.AddTotalExp(budgeContr.newExpId());
                budgeContr.addToElementExp();
               
                budgeContr.deletedExp(addInput.type);
            }


           
          
        }();
        //clear inputs
        UiContr.clearfields();


        //add income to Total
        budgeContr.totalUi();


        
       

    } 
    }


  





    document.querySelector(".add").addEventListener('click', addItem);

    window.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            console.log("enter was pressed");
            addItem();
        }
    });

})(backController, uiInterface);