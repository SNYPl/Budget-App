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
    let totals;



    return {



        itemAdded: function (type = 'inc', des = "", val = 0) {
            let newItem, ID;


            if (data.all[type].length > 0) {
                ID = data.all[type][data.all[type].length - 1].id + 1;
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


        addToTotalInc: function (idNum) {
            let dataInc = data.all.inc[idNum].value
            totalIncomes.push(parseInt(dataInc));

        },


        AddTotalExp: function (idNum) {

            let dataExp = data.all.exp[idNum].value
            totalExpanses.push(parseInt(dataExp));

        },


        totalUi: function (type) {

            let totinc = totalIncomes.reduce((acc, cur) => acc + cur);
            let totexp = totalExpanses.reduce((acc, cur) => acc + cur);


            totals = totinc - totexp;



            document.getElementById("budget-value").textContent = `${parseInt(totals)}`;



            if (document.getElementById("budget-value").textContent < 0) {
                document.querySelector(".Change").textContent = "";
                document.getElementById("budget-value").style.color = "#e6082d";
                document.getElementById("bd").style.color = "#e6082d";
            } else if (document.getElementById("budget-value").textContent > 0) {
                document.querySelector(".Change").textContent = "+";
                document.getElementById("budget-value").style.color = "#fff";
                document.getElementById("bd").style.color = "#fff";
                document.querySelector(".Change").style.color = "#fff";
            }


        },


        addToElementInc: function () {
            let incomeDiv = document.getElementById("incomes");

            incomeDiv.textContent = `${totalIncomes.reduce((acc,cur)  =>  acc+cur)}`;

        },


        addToElementExp: function () {
            let expenseDiv = document.getElementById("expenses");

            expenseDiv.textContent = `${totalExpanses.reduce((acc,cur)  =>  acc+cur)}`;

        },


        addId: function (type) {

            let ID = data.all[type][data.all[type].length - 1].id;
            let typ = ID

            return typ;
        },


        newIncId: function () {
            let inc = 0;
            inc = data.all.inc.length - 1;

            return inc;
        },


        newExpId: function () {
            let exp = 0;
            exp = data.all.exp.length - 1;

            return exp;
        },


        deleteFromData: function (ty, id) {
            let ids, index;

            ids = data.all[ty].map(function (current) {

                return current.id;

            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.all[ty].splice(index, 1);

                if (ty == "inc") {
                    totalIncomes.splice(index + 1, 1);

                } else if (ty == "exp") {
                    totalExpanses.splice(index + 1, 1);

                }

            }

        },



        deleteFromUi: function (select) {
            let selector = document.getElementById(select);
            if (selector) {
                selector.parentNode.removeChild(selector);
            }
        },




        deletedInc: function (type) {

            let btn1 = document.querySelector(".container__income");

            btn1.addEventListener("click", function (event) {
                event.preventDefault()

                let itemId, splitId, type, id;

                itemId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                if (itemId) {

                    splitId = itemId.split("-");
                    type = splitId[0];
                    id = parseInt(splitId[1]);
                    backController.deleteFromData(type, id)
                    backController.deleteFromUi(itemId);
                    backController.totalUi();
                    backController.addToElementInc();
                    

                }

            });

        },





        deletedExp: function (type) {

            let btn1 = document.querySelector(".container__expanse");


            btn1.addEventListener("click", function (event) {
                let itemId, splitId, type, id;

                itemId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                if (itemId) {

                    splitId = itemId.split("-");
                    type = splitId[0];
                    id = parseInt(splitId[1]);
                    backController.deleteFromData(type, id)
                    backController.deleteFromUi(itemId);
                    backController.totalUi();
                    backController.addToElementExp();

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

        addIncome: function (type, id, description, value, mp, cls, btn, del) {

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
            id++;
        },


        clearfields: function () {

            document.querySelector(domStrings.des).value = "";
            document.querySelector(domStrings.val).value = "";

            document.querySelector(domStrings.des).focus();
        },

    }



})();






const controller = (function (budgeContr, UiContr) {


    document.getElementById("incomes").textContent = 0;
    document.getElementById("expenses").textContent = 0;

        let description = document.querySelector(".add--description");
        let inputValue = document.querySelector(".add--value");


    let addItem = function () {
        


        if (description.value.length === 0 || inputValue.value.length === 0) {
            event.preventDefault();

        } else if (inputValue.value.includes("-")) {
            inputValue.value = "";
            inputValue.placeholder = "Error";
            inputValue.classList.add("desc-color-red");
            inputValue.focus(); 
            event.preventDefault();

        } else if (description.value.includes("<") || description.value.includes(">") || description.value.includes("[") 
        || description.value.includes("{") || description.value.includes("-") || description.value.includes("+") || description.value.includes("}") || description.value.includes("]")) {
            description.value = "";
            description.placeholder = "Enter only text..";
            description.classList.add("desc-color-red");
            description.focus();       
            event.preventDefault();


        } else {
            description.classList.remove("desc-color-red");
            description.placeholder = "Add Description";
            inputValue.placeholder = "Value";
            inputValue.classList.remove("desc-color-red")

            // Get Inputs
            let addInput = UiContr.getInputs();

            // Add New Item
            let addItems = budgeContr.itemAdded(addInput.type, addInput.desc, addInput.val)



            
            //add item to UI
            let adInp = function () {
                if (addInput.type == 'inc') {
                    UiContr.addIncome('.income', `inc-${budgeContr.addId(addInput.type)}`, addInput.desc, addInput.val, `+`, "blue", "btn-inc", "del1");
                    budgeContr.addToTotalInc(budgeContr.newIncId());
                    budgeContr.addToElementInc();


                } else if (addInput.type == 'exp') {
                    UiContr.addIncome('.expanse', `exp-${budgeContr.addId(addInput.type)}`, addInput.desc, addInput.val, `-`, "red", "btn-exp", "del2");
                    budgeContr.AddTotalExp(budgeContr.newExpId());
                    budgeContr.addToElementExp();
                }




            }();
            //clear inputs
            UiContr.clearfields();


            //add income to Total
            budgeContr.totalUi();

            //delete item from Ui and data  
            budgeContr.deletedInc(addInput.type);
            budgeContr.deletedExp(addInput.type);


        }


    }


        function onChange () {
           
            description.classList.toggle("border-color");
            inputValue.classList.toggle("border-color");  
            document.querySelector(".add").classList.toggle("backgroundColor");    
        }


            document.querySelector(".add--type").addEventListener("change", onChange);


       
        




    document.querySelector(".add").addEventListener('click', addItem);

    window.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            console.log("enter was pressed");
            addItem();
        }
    });

})(backController, uiInterface);


function removeSpaces(string) {
    return string.split(' ').join('');

}