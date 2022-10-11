// Criar a classe Tasks, que são nossas tarefas.
class Task {
  constructor(status, description) {
    this.status = status;
    this.description = description;
  }
}
//criar a classe card, que é onde ficam nossas tarefas
class Card {
  name;
  tasks = [];

  constructor(name) {
    this.name = name;
    this.loadMethods();
  }
  loadMethods() {
    this.loadElements();
    this.insertNewTask();
    this.listenForChanges();
  }
  // 1 Método para imprimir
  printTask(status, description) {
    if (this.validateDescription(description) == false) {
      return false;
    }

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = status;

    let label = document.createElement("label");
    label.setAttribute("contentEditable", "true");
    label.innerText = description;

    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "removeButton");

    let groupTaskElements = document.createElement("div");
    groupTaskElements.setAttribute("class", "taskGroup");
    groupTaskElements.setAttribute("draggable", "true");
    groupTaskElements.addEventListener(
      "mouseenter",
      function (e) {
   
        this.prototype.dragAndDrop(e.path[0]);
      }.bind(Card)
    );

    groupTaskElements.append(checkbox);
    groupTaskElements.append(label);
    groupTaskElements.append(removeButton);

    /* adicionar os valores em seu respectivo cardHTML, vamos usar o nome do objeto card */
    let cardElement = document.querySelector(`#${this.name}`);
    cardElement = cardElement.querySelector(".tasks");
    cardElement.append(groupTaskElements);
  }
  // 2 Método de carregar os dados.
  loadElements() {
    let tasks = localStorage.getItem(`${this.name}`);
    if (!tasks) {
      return false;
    }
    tasks = JSON.parse(tasks);
    this.tasks = tasks;

    this.tasks.forEach((task) => this.printTask(task.status, task.description));
  }
  //3 Método para Guardar novos dados
  insertNewTask() {
    let currentCard = document.querySelector(`#${this.name}`);
    let form = currentCard.querySelector(".addTask");
    form.onsubmit = (e) => {
      e.preventDefault();
      let inputValue = currentCard.querySelector(".addTaskInput").value;
      this.tasks.push(new Task(false, inputValue));
      currentCard.querySelector("form").reset();

      this.printTask(false, inputValue);
      localStorage.setItem(`${this.name}`, JSON.stringify(this.tasks));
      this.listenForChanges();
    };
  }
  //Método para atualizar
  updateTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));
    // FIXME:
    //verificar
    // if (tasks[0].description == undefined) {
    //   tasks.splice(0, 1);
    // }

    tasks[index].status = element.querySelector("input").checked;
    tasks[index].description = element.querySelector("label").innerText;
    this.tasks = tasks;

    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    localStorage.setItem(JSON.stringify(`${this.name}`), tasks);
  }
  // Método para verificar alterações nos elementos.
  listenForChanges() {
    let currentCard = document.querySelector(`#${this.name}`);
    // console.log(`e isso ai`);

    currentCard
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.onclick = () => {
          let array = Array.from(checkbox.parentNode.parentNode.children);
          const index = array.indexOf(checkbox.parentNode);
          this.updateTask(index, checkbox.parentNode);
        };
      });

    currentCard.querySelectorAll("label").forEach((label) => {
      label.onblur = () => {
        let array = Array.from(label.parentNode.parentNode.children);
        const index = array.indexOf(label.parentNode);
        console.log(index);
        console.log(this);
        this.updateTask(index, label.parentNode);
      };
    });

    currentCard = document.querySelector(`#${this.name}`);

    currentCard.querySelectorAll(".removeButton").forEach((element) => {
      element.onclick = () => {
        let array = Array.from(element.parentNode.parentNode.children);
        const index = array.indexOf(element.parentNode);
        console.log(index);
        this.removeTask(index, element);
      };
    });
  }
  removeTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));
    tasks.splice(index, 1);
    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    this.tasks = tasks;
    console.log(element.parentNode.remove());
  }
  // validar descrição
  validateDescription(description) {
    if (typeof description != "string" || description.trim() == "") {
      return false;
    }
  }


  // método para atualizar o localstorage
  refreshAllTasks() {
    log('vamo mudar tudo')
    return 0;

    let period;
    console.log("VAMOS ATUALIZAR TUDO");
    let periods = document.querySelectorAll(".card");

    periods.forEach((period) => {
      period = period.id;
      console.log(period);
    });

    period = content.parentNode.parentNode.parentNode.id;

    // get all the values in localStorage
    let chave = localStorage.getItem(period);
    //convert to an array separating the values by comma(,)

    for (let i = 0; i < chave.length; i++) {
      // get the index of the content parent element
      var ParentIndex = [].indexOf.call(
        content.parentNode.parentNode.childNodes,
        content.parentNode
      );
      // if index of content element equals to chave index
      if (i == ParentIndex) {
        // index of content
        chave[i] = content.innerText;
      }
      localStorage.setItem(period, chave);
    }
  }

  //FIXME:
  // método para arrastar e soltar as tarefas.
  dragAndDrop(element) {
    let cards = [shortCard, mediumCard, longCard]
    element.ondragstart = function () {
      console.log("Estou sendo arrastado!");
      console.log(element);

      //pegar o index do elemento, na posição original.

      //é isso
      //TODO:
        //index antes
        let array = Array.from(element.parentNode.children);
        const indexBefore = array.indexOf(element);
        console.log(indexBefore);

        //verificar de qual card retirar a tarefa (recortar).
        let cardElement = element.parentNode.parentNode
        for(let card of cards) if(card.name == cardElement.id){
          //retirar do objeto e guarda-lo
          const dragging = card.tasks.splice(indexBefore,1)
          console.log('saiu do card');
          console.log(card)
          console.log('sou o dragging');
          console.log(dragging)

          //atualizar o json com a task retirada.
          console.log('storage:');
          localStorage.setItem(card.name, JSON.stringify(card.tasks))
          console.log(JSON.parse(localStorage.getItem(card.name)));
        }
      //é isso

      
      console.log(indexBefore);
      //FIXME:
      //verificar em qual card está
      console.log(element.parentNode.parentNode.id)
      //usar o id para atualizar na localStorage e no card
      console.log(this);


      // quando ele estiver sendo arrastado deve receber a classe is dragging
      element.classList.add("is-dragging");

      // Acenturar a cor do card, de cada card (onde estão as tasks).
      document
        .querySelectorAll(".tasks")
        .forEach((task) => task.classList.add("highlight"));

      //quando o elemento parar de ser arrastado
      element.ondragend = function () {
        //index final
        let array = Array.from(element.parentNode.children);
        const indexAfter = array.indexOf(element);
        console.log(indexBefore);
        console.log(indexAfter);
        
        //verificar  qual card vai receber o valor.
        let cardElement = element.parentNode.parentNode
        for(let card of cards) if(card.name == cardElement.id){
          //retirar do objeto e guarda-lo
          let dragging = new Task(element.querySelector('input').checked, element.querySelector('label').innerText);

          card.tasks.splice(indexAfter, 0 , dragging)
          console.log('Card atualizado:');
          console.log(card.tasks)

          console.log(dragging)

          //atualizar o json com a task retirada.
          console.log('storage:');
          localStorage.setItem(card.name, JSON.stringify(card.tasks))
          console.log(JSON.parse(localStorage.getItem(card.name)));
        }

        //Remover o efeito de arrastando
        element.classList.remove("is-dragging");
        
        //remover todos os efeitos de disponilidadade
        document
          .querySelectorAll(".tasks")
          .forEach((task) => task.classList.remove("highlight"));
      };
      //loop por todos os cards
      document.querySelectorAll(".tasks").forEach((task) => {
        //receber o card que foi arrastado, é importante ter o preventdafault para poder usar o ondrop.
        let test = task.addEventListener("dragover", function (e) {
          //classe para colocar o verde no fundo (de disponibilidade)
          e.preventDefault();
          this.classList.add("over");

          const cardBeingDragged = document.querySelector(".is-dragging");
          this.appendChild(cardBeingDragged);
        });
        //remover o background verde
        task.addEventListener("dragleave", function () {
          this.classList.remove("over");
        });
        //quando for dropado, salve os elementos.
        task.ondrop = function () {
          this.classList.remove("over");
          console.log("DANCE FOR ME");
          console.log("droped");
        };

        // this.refreshAllTasks();
      });
    };
  }

  //method para arrastar elemento
  drag(element) {
    
  }

  drop() {}
}

const shortCard = new Card("shortCard");
const mediumCard = new Card("mediumCard");
const longCard = new Card("longCard");
