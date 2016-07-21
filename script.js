var $newMonsterForm = $('.new-monster-form');
var $newMonsterName = $('.new-monster-form--name');
var $newMonsterSubmit = $('.new-monster-form--submit');

var $monsterList = $('.monster-list');

$newMonsterForm.on('submit', function (event) {
  event.preventDefault();
  var name = $newMonsterName.val();

  // We'll do stuff here.
  Monstertorium.add(name);

  $newMonsterName.val('');
  Monstertorium.render();
});

$monsterList.on('click', '.monster-levelup', function () {
  var id = $(this).parents('.monster-list-item').attr('id');
  var monster = Monstertorium.find(id);
  monster.levelUp();
  Monstertorium.render();
  console.log('Level up', monster);
});

$monsterList.on('click', '.monster-leveldown', function () {
  var id = $(this).parents('.monster-list-item').attr('id');
  var monster = Monstertorium.find(id);
  monster.levelDown();
  Monstertorium.render();
  console.log('Level down', monster);
});

$monsterList.on('click', '.monster-delete', function () {
  var id = $(this).parents('.monster-list-item').attr('id');
  var monster = Monstertorium.find(id);
  monster.delete();
  Monstertorium.render();
  console.log('Delete', monster);
});

var Monstertorium = {
  monsters: [],
  add: function (name) {
    this.monsters.push(new Monster(name));
    this.store();
  },
  find: function (id) {
    id = parseInt(id);
    for (var i = 0; i < this.monsters.length; i++) {
      var monster = this.monsters[i];
      if (id === monster.id) { return monster }
    }
  },
  remove: function (id) {
    id = parseInt(id);
    var remainingMonsters = [];
    for (var i = 0; i < this.monsters.length; i++) {
      var monster = this.monsters[i];
      if (id !== monster.id) {
        remainingMonsters.push(monster);
      }
    }
    this.monsters = remainingMonsters;
    this.store;
  },
  render: function () {
    $monsterList.html('');
    for (var i = 0; i < this.monsters.length; i++) {
      var monster = this.monsters[i];
      console.log(monster);
      $monsterList.append(monster.toHTML());
    }
  },
  store: function () {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  },
  fetch: function () {
    var monsters = JSON.parse(localStorage.getItem('monsters'));
    this.monsters = [];
    for (var i = 0; i < monsters.length; i++) {
      var monster = monsters[i];
      this.monsters.push(new Monster(monster.name, monster.id, monster.level));
    }
    return this.monsters;
  }
};

function Monster(name, id, level) {
  this.id = id || Date.now();
  this.name = name;
  this.level = level || 1;
}

Monster.prototype.toHTML = function () {
  return $(`
    <article class="monster-list-item" id="${this.id}">
      <h2>${this.name}</h2>
      <p class="monster-level">Level <span class="monster-level-number">${this.level}</span></p>
      <img src="https://www.gravatar.com/avatar/${md5(this.id)}?d=monsterid&s=200">
      <div class="monster-controls">
        <button class="monster-levelup">Level Up</button>
        <button class="monster-leveldown">Level Down</button>
        <button class="monster-delete">Delete</button>
      </div>
    </article>
  `);
};

Monster.prototype.levelUp = function () {
  this.level++;
  Monstertorium.store();
}

Monster.prototype.levelDown = function () {
  if (this.level > 1) { this.level--; }
  Monstertorium.store();
}

Monster.prototype.delete = function () {
  Monstertorium.remove(this.id);
}

Monstertorium.fetch();
Monstertorium.render();
