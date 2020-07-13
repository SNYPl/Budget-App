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

            // ID = data.all['inc'].length + data.all['exp'].length + 1
            // ID = data.all[type].length +1;

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

        // deleteFirstElement: function () {
        //     data.all.inc.shift();
        // },

        testdata: function () {
            console.log(data);
            console.log(totalIncomes);
            console.log(totalExpanses);
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


        addToTotalInc : function () {
            let IncCont = document.querySelector(".add--value").value;
            totalIncomes.push(parseInt(IncCont));
            console.log(totalIncomes);

        },


        AddTotalExp : function () {
        let expCont = document.querySelector(".add--value").value;
            totalExpanses.push(parseInt(expCont));
            console.log(totalExpanses);
        },


        totalUi : function () {

            let totinc = totalIncomes.reduce((acc,cur)  =>  acc+cur);
            let totexp = totalExpanses.reduce((acc,cur)  =>  acc+cur);
            let totals = totinc - totexp;
           
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


        addId: function (type) {
        
          let ID =data.all[type][data.all[type].length -1].id;
           let typ = ID

        return typ;
        },


        deleteTotal:function(id) {
            
            totalIncomes.splice(id,id );
            let ta;
            ta = totalIncomes;


            return ta;
        },




        deleteInc:function(type) {

            let btn =  document.querySelector(".del1");
            
            let btn1 =  document.querySelector(".container__income");

 
            btn1.addEventListener("click", function(event) {
                let itemId, splitId, type , id;
                console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id);
                
                itemId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                if(itemId) {
                
                    splitId = itemId.split("-");
                    type=splitId[0];
                    id=splitId[1];
                  



                }




                // const parentItem = document.querySelector(".btn-inc").parentElement.parentNode.parentElement
                // const id = parentItem.getAttribute('id')
                // console.log(document.querySelector(".btn-inc").parentElement.parentNode.parentElement.id)
                
                // parentItem.remove()

                // backController.deleteTotal(backController.addId(document.querySelector(".add--type").value) - 1);

                
                // delete data.all[type][data.all[type].length -1].id +


                // console.log(data.all[type][id]); 
                // console.log(data.all[type][data.all[type].length -1]);
                // console.log(id);
                // console.log();


               
                // backController.totalUi();

          
               
            }); 
            
            


        }



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





        deleteInc : function () {
           
 
         },


        deleteExp : function () {
           


 
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
                budgeContr.addToElementInc();
                budgeContr.addToTotalInc();
                budgeContr.deleteInc(addInput.type);

            } else if (addInput.type == 'exp') {
                UiContr.addIncome('.expanse', `exp-${budgeContr.addId(addInput.type)}`, addInput.desc, addInput.val, `-`,"red", "btn-exp","del2");
                budgeContr.addToElementExp();
                budgeContr.AddTotalExp();
                // UiContr.deleteExp();
                // budgeContr.tester2();
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