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

            ID = data.all['inc'].length + data.all['exp'].length + 1

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);


            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.all[type].push(newItem)

            return newItem;

        },

        deleteFirstElement: function () {
            data.all.inc.shift();
        },

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


        },


        AddTotalExp : function () {
        let expCont = document.querySelector(".add--value").value;
            totalExpanses.push(parseInt(expCont));

        },


        totalUi : function (mp) {

            let totinc = totalIncomes.reduce((acc,cur)  =>  acc+cur);
            let totexp = totalExpanses.reduce((acc,cur)  =>  acc+cur);
            let totals = totinc - totexp;
           
                document.getElementById("budget-value").textContent=`${parseInt(totals)}`;



                if(document.getElementById("budget-value").textContent < 0) {
                    document.querySelector(".Change").textContent="";
                } else if (document.getElementById("budget-value").textContent > 0) {
                    document.querySelector(".Change").textContent="+";

                }

            

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

        addIncome: function (type, id, description, value, mp) {

             document.querySelector(`${type}-list`).insertAdjacentHTML('afterbegin', ` <div class="item " id=${id}>
                <div class="item__description">${description}</div>
                            <div class="right">
                       <div class="item__value"><div class="minus" id="minus">+</div> ${value}</div>
                   </div>
               </div>`)
            
        },


        clearfields: function () {

            document.querySelector(domStrings.des).value="";
            document.querySelector(domStrings.val).value ="";

            document.querySelector(domStrings.des).focus();
        }
    }

    

})();






const controller = (function (budgeContr, UiContr) {
    let Strings = UiContr.getStrings();
    budgeContr.deleteFirstElement();
    
    // document.getElementById("budget-value").textContent=0;

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
                UiContr.addIncome('.income', this.ID, addInput.desc, addInput.val, `+`);
                budgeContr.addToElementInc();
                budgeContr.addToTotalInc();

            } else if (addInput.type == 'exp') {
                UiContr.addIncome('.expanse', this.ID, addInput.desc, addInput.val, `-`);
                budgeContr.addToElementExp();
                budgeContr.AddTotalExp();

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