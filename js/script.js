$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for(var i =0; i<10; i++) {
            str+= chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
        
        $columnDelete.click(function() {
            self.removeColumn();
        });

        $columnAddCard.click(function() {
            self.addCard(new Card(prompt("Enter the name of the card: ")));
        });

        $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

        return $column;

        }


    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    }

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        

        function createCard () {
            var $card = $('<li>').addClass('card list-group-item');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            var $listGroup = $(".column-card-list").addClass("list-group");
        $cardDelete.click(function() {
            self.removeCard();
        });

        $card.append($cardDelete)
                .append($cardDescription);
            return $card;

        }




    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
        
    }

    var htmlContainer = {
        addBoard: function(board) {
            this.$element.append(board.$element);
        },
        $element: $('.container')
    }

    function Board(name) {
        var self = this;
        this.name = name;
        this.id = randomString();
        this.$element = createBoard();
        function createBoard() {
            var $board = $('<div class="board-container">board</div>');
            var $columnButton = $('<button class="create-board btn btn-primary">Add a column</button>');
        $columnButton.click(function() {
            self.addColumn(new Column(prompt("Podaj nazwę kolumny: ")));
        });
        $board.append($columnButton);
        return $board;

        }

    }

    Board.prototype = {
        addColumn: function(column) {
            this.$element.append(column.$element);
        }
    }

    function initSortable() {
        $('.column-card-list').sortable( {
            connectWith: '.column-card-list',
            placeholder: '.card-placeholder',
            opacity: '0.7'
        }).disableSelection();
    }

    $('.create-column')
        .click(function() {
            var name = prompt("Enter a column name");
            var column = new Column(name);
            board.addColumn(column);
        });
    
    $('.create-board').click(function() {
        var nowaTablica = new Board(prompt("Podaj nazwę nowej tablicy: "));
        htmlContainer.addBoard(nowaTablica);
    });

    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    



 


})