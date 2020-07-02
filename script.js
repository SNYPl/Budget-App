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

        total: {
            exp: 0,
            inc: 0
        }
    }




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
            console.log(data.all);
        },

        addToElement : function (ty) {
            let incomeDiv = document.getElementById("incomes");
            let expenseDiv = document.getElementById("expenses");
            

            let pars =  parseInt(incomeDiv.textContent);
                for(i =0; i <data.all.inc.length;i++) {

                   
                    incomeDiv.textContent =`+${pars + parseInt(data.all.inc[i].value)}`;
                   console.log(incomeDiv.textContent) 
                   

                    };
        


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
                       <div class="item__value">${mp} ${value}</div>
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
            } else if (addInput.type == 'exp') {
                UiContr.addIncome('.expanse', this.ID, addInput.desc, addInput.val, `-`);

            }
        }();
        //clear inputs
        UiContr.clearfields();


        //add income to div
        budgeContr.addToElement();

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