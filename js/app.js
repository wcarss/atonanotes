"use strict";

import Creek from "./creek/creek.js";
import Palettes from "./palettes.js";
import { drawTrebleClef, drawBassClef } from './draw-clefs.js';

class Staff {
  constructor(palette) {
    this.palette = palette;
  }

  init(creek) {
    this.creek = creek;
    creek.utilities.setup_throttle('notes', 120);
    this.line_spacing = 20;
    this.note_spacing = 100;
    this.max_x = creek.camera.rect.x_size;
    this.max_y = creek.camera.rect.y_size;
    this.x = 0;
    this.y = (this.max_y / 2) - (8 * this.line_spacing);
    this.setupNotes();
  }

  clearNotes() {
    if (!this.notes) {
      return;
    }

    for (const note of this.notes) {
      const index = this.creek.data.entity_list.findIndex(e => e.id && e.id.split('_')[0] === `note`)
      this.creek.data.entity_list.splice(index, 1);
    }
    this.notes = [];
  }

  getEnabled(d) {
    const r = [];
    for (const [k, v] of Object.entries(d)) {
      console.log('k, v:', k, ',', v);
      if (v) {
        r.push(k);
      }
    }
    return r;
  }

  setupNotes() {
    this.clearNotes();
    const clefs = this.getEnabled(this.creek.data.clefs)
    console.log('clefs:', clefs)
    this.clef = this.creek.utilities.random_choice(clefs);
    this.scale = this.creek.utilities.random_choice(this.getEnabled(this.creek.data.scales));
    const numNotes = this.creek.utilities.random_int(this.creek.data.min_notes)+(this.creek.data.max_notes-this.creek.data.min_notes);
    const denoms = this.getEnabled(this.creek.data.denoms);
    console.log('this.clef:', this.clef);
    const notes = this.getNoteSets(this.clef, this.scale);

    for (let i = 0; i < numNotes; i++) {
      this.addNote(this.creek.utilities.random_choice(notes), this.creek.utilities.random_choice(denoms));
    }
    this.notes[0].state = "next";
    this.next_note = 0;
  }

  getHeightOffsets = clef => {
    return {
      treble: {
        c4: 10,
        d4: 9,
        e4: 8,
        f4: 7,
        g4: 6,
        a4: 5,
        b4: 4,
        c5: 3,
        d5: 2,
        e5: 1,
        f5: 0,
        g5: -1,
        a5: -2,
      },
      bass: {
        e2: 10,
        f2: 9,
        g2: 8,
        a2: 7,
        b2: 6,
        c3: 5,
        d3: 4,
        e3: 3,
        f3: 2,
        g3: 1,
        a3: 0,
        b3: -1,
        c4: -2,
      },
    }[clef];
  };

  getNoteSets = (clef, scale) => {
    return {
      treble: {
        chromatic: ['c4','d4','e4','f4','g4','a4','b4','c5','d5','e5','f5','g5','a5'],
        lines: ['c4','e4','g4','b4','d5','f5','a5'],
        spaces: ['d4','f4','a4','c5','e5','g5'],
      },
      bass: {
        chromatic: ['e2','f2','g2','a2','b2','c3','d3','e3','f3','g3','a3','b3','c4'],
        lines: ['e2','g2','b2','d3','f3','a3','c4'],
        spaces: ['f2','a2','c3','e3','g3','b3'],
      },
    }[clef][scale];
  }

  noteHeightOffset = (pitch) => {
    const offset = this.getHeightOffsets(this.clef)[pitch]*this.line_spacing/2;
    //console.log(`${pitch} of ${this.clef} staff is offset: ${offset}`);
    return offset;
  };

  setupNoteCoords() {
    for (const [index, note] of Object.entries(this.notes)) {
      note.x = this.max_x / 2 - (this.notes.length*this.note_spacing)/2 + index*this.note_spacing;
      note.y = this.y + this.noteHeightOffset(note.pitch);
      note.text_y = this.y + this.line_spacing * 8;
      //console.log(`note ${note.pitch} x,y: (${note.x},${note.y})`);
    }
  }

  addNote = (pitch, denomination) => {
    if (this.notes === null || this.notes === undefined) {
      this.notes = [];
    }
    const newNote = new Note(`note_${this.notes.length}`, this.palette, denomination, pitch, 0, 0, this.line_spacing/2);
    this.notes.push(newNote);
    this.creek.data.entity_list.push(newNote);
    this.setupNoteCoords();
  };

  draw(context, interpolation) {
    context.fillStyle = this.palette[0];
    context.fillRect(0, 0, this.max_x, this.max_y);

    for (let i = 0; i < 5; i++) {
      context.strokeStyle = this.palette[1];
      context.beginPath();
      context.moveTo(this.x, this.y + i*this.line_spacing);
      context.lineTo(this.max_x, this.y + i*this.line_spacing);
      context.stroke();
    }

    const drawClef = {
      treble: drawTrebleClef,
      bass: drawBassClef,
    }[this.clef];
    const clefHeight = {
      treble: this.line_spacing*7.5,
      bass: this.line_spacing*3.5,
    }[this.clef];
    const clefHeightOffset = {
      treble: -this.line_spacing*1.64,
      bass: -this.line_spacing*0.1,
    }[this.clef];
    drawClef(context, this.x+50, this.y+clefHeightOffset, clefHeight, this.palette[2], this.palette[0]);
  }

  update(creek) {
    // recalibrate on resizes
    if (creek.camera.rect.x_size !== this.max_x) {
      this.max_x = creek.camera.rect.x_size;
      this.max_y = creek.camera.rect.y_size;
      this.y = (this.max_y / 2) - (8 * this.line_spacing);      
      this.setupNoteCoords();
    }


    if (this.next_note < this.notes.length) {
      const expectedKey = `Key${this.notes[this.next_note].pitch[0].toUpperCase()}`;
      // console.log(`expecting: ${expectedKey}`);
      if ((creek.controls.check_mouse() || creek.controls.check_key('Space') || creek.controls.check_key(expectedKey)) && creek.utilities.use_throttle('notes')) {
        this.notes[this.next_note].state = "passed";
        this.next_note += 1;
        if (this.next_note < this.notes.length) {
          this.notes[this.next_note].state = "next";
        } else {
          setTimeout(() => {
            this.palette = creek.utilities.random_choice(Palettes);
            this.setupNotes();
          }, 1000);
        }
      }
    }
  }

  get rect() {
    return {
      x: this.x,
      y: this.y,
      x_size: this.x_size,
      y_size: this.y_size,
    };
  }
}

class Note {
  constructor(id, palette, denomination="w", pitch, x, y, text_y, size=10) {
    this.id = id;
    this.palette = palette;
    this.denomination = denomination;
    this.pitch = pitch;
    this.x = x;
    this.y = y;
    this.text_y = text_y;
    this.x_size = size;
    this.y_size = size;
    this.speed = 0;
    this.stemHeight = 60;
    this.state = "active";
    this.x_wobble = 0;
    this.y_wobble = 0;
    this.x_wobble_speed = 0.37;
    this.y_wobble_speed = 0.43;
    this.font_opacity = 1;
  }

  init(creek) {
    this.creek = creek;
    console.log('note was inited');
  }

  drawStem = (context, x, y) => {
    context.beginPath();
    context.moveTo(x+this.x_size-1, y);
    context.lineTo(x+this.x_size-1, y-this.stemHeight);
    context.stroke();
  }

  drawLeaves = (context, x, y, leafCount) => {
    const length = 14;
    const height = 5;
    const drop = 7;
    const offsetDist = 9;
    let offset = 0;
    for (let i = 0; i < leafCount; i++) {
      context.moveTo(x+(this.x_size-1), y-this.stemHeight+offset);
      context.lineTo(x+(this.x_size-1)+length, y-this.stemHeight+offset+drop);
      context.lineTo(x+(this.x_size-1)+length, y-this.stemHeight+offset+drop+height);
      context.lineTo(x+(this.x_size-1), y-this.stemHeight+offset+height);
      context.lineTo(x+(this.x_size-1), y-this.stemHeight+offset);
      context.fill();
      offset += offsetDist;
    }
  }

  draw(context, interpolation) {
    context.fillStyle = this.palette[2];
    context.strokeStyle = this.palette[2];
    if (this.state === "next") {
      context.fillStyle = this.palette[3];
      context.strokeStyle = this.palette[3];
    } else if (this.state === "passed") {
      context.fillStyle = this.palette[1];
      context.strokeStyle = this.palette[1];
    }
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.arc(this.x+this.x_wobble, this.y+this.y_wobble, this.x_size, this.y_size, 0, Math.PI*2);
    context.fill();
    const drawDetails = {
      w: {
        stem: false,
        leaves: 0,
      },
      h: {
        stem: true,
        leaves: 0,
      },
      q: {
        stem: true,
        leaves: 1,
      },
      e: {
        stem: true,
        leaves: 2,
      },
      s: {
        stem: true,
        leaves: 3,
      },
      t: {
        stem: true,
        leaves: 4,
      },
    }[this.denomination];
    if (drawDetails.stem) {
      this.drawStem(context, this.x+this.x_wobble, this.y+this.y_wobble);
    }
    this.drawLeaves(context, this.x+this.x_wobble, this.y+this.y_wobble, drawDetails.leaves);
    if (this.state === "passed") {
      // console.log('font opacity:', this.font_opacity);
      context.globalAlpha = this.font_opacity;
      context.fillStyle = this.palette[3];
      context.font = '24px sans';
      context.fillText(this.pitch[0].toUpperCase(), this.x-this.x_size, this.text_y);
      context.globalAlpha = 1;
    }
  }

  update(creek) {
    if (this.state === "next") {
      this.x_wobble += this.x_wobble_speed;
      this.y_wobble += this.y_wobble_speed;
      if (this.x_wobble > 2.5 || this.x_wobble < -2.5) {
        this.x_wobble_speed *= -1;
      }
      if (this.y_wobble > 2.5 || this.y_wobble < -2.5) {
        this.y_wobble_speed *= -1;
      }
    } else {
      this.x_wobble = 0;
      this.y_wobble = 0;
    }

    if (this.state === "passed" && this.font_opacity > 0) {
      this.font_opacity -= 0.015;
    }
    if (this.font_opacity < 0) {
      this.font_opacity = 0;
    }
  }

  get rect() {
    return {
      x: this.x,
      y: this.y,
      x_size: this.x_size,
      y_size: this.y_size,
    };
  }
}

window.onload = async () => {
  const creek = new Creek();
  const palette = creek.utilities.random_choice(Palettes);
  const staff = new Staff(palette);

  let settingsDisplayed = false;
  const settings = document.getElementById("settings");
  const settingsToggle = document.getElementById("settings_toggle");
  const clefs = document.getElementById("settings_clefs");
  const scales = document.getElementById("settings_scales");
  const denoms = document.getElementById("settings_denoms");
  const min_notes = document.getElementById("settings_min_notes");
  const max_notes = document.getElementById("settings_max_notes");
  const num_levels = document.getElementById("settings_num_levels");
  
  const createLabel = (value) => {
    const span = document.createElement('span');
    span.innerText = `${value}: `;
    return span;
  };

  const addCheckbox = (parent, key, value, callback) => {
    const parentElem = document.getElementById(parent);
    const label = createLabel(key);
    const input = document.createElement('input');
    input.type = "checkbox";
    input.checked = value;
    input.classList.add('setting_checkbox');
    input.addEventListener("change", callback);
    const div = document.createElement('div');
    div.appendChild(label);
    div.appendChild(input);
    parentElem.appendChild(div);
  };

  const addCheckboxes = (settingsArea) => {
    const settings = creek.data[settingsArea];
    for (const [key, value] of Object.entries(settings)) {
      addCheckbox(
        `settings_${settingsArea}`,
        key,
        settings[key],
        // close over these values for the callback
        ((settings, key) => () => {
          settings[key] = !settings[key];
        })(settings, key)
      );
    }
  }

  const toggleSettings = (e) => {
    settingsDisplayed = !settingsDisplayed;
    const settingsContent = document.getElementById("settings_content");
    const settingsToggle = document.getElementById("settings_toggle");
    if (!settingsDisplayed) {
      settingsContent.classList.add("invisible");
      settingsToggle.innerHTML = "settings +";
    } else {
      settingsContent.classList.remove("invisible");
      settingsToggle.innerHTML = "settings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x";
    }
  }
  settingsToggle.addEventListener("click", toggleSettings)

  creek.init([]);
  creek.run();
  creek.data.entity_list = [staff];
  creek.data.staff = staff;

  // config of what to show
  creek.data.clefs = {
    treble: true,
    bass: true
  };
  creek.data.denoms = {
    w: true,
    h: true,
    q: true,
    e: true,
    s: true,
    t: true,
  };
  creek.data.scales = {
    chromatic: true,
    lines: true,
    spaces: true,
  };
  creek.data.min_notes = 5;
  creek.data.max_notes = 10;
  creek.data.number_of_levels = 5;
  staff.init(creek);
  addCheckboxes('clefs');
  addCheckboxes('scales');
  addCheckboxes('denoms');
};
