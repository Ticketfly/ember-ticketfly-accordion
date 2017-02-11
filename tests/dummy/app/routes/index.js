import Route from 'ember-route';

const IRON_MAN_OVERVIEW = {
  synopsis: { title: 'Synopsis', content: 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.' },

  // Use block form for these:
  stats: { title: 'Stats', content: { releaseDate: 'May 2, 2008 (USA)', director: 'Jon Favreau', runTime: '2h 6m', boxOffice: '585.2 million USD', budget: '140 million USD', producers: ['Kevin Feige', 'Avi Arad'] } },
  cast: { title: 'Cast', content: ['Robert Downey Jr. (Tony Stark)', 'Terrence Howard (Rhodey)', 'Jeff Bridges (Obadiah Stane)', 'Gwyneth Paltrow (Pepper Potts)'] },
  similarTitles: { title: 'Similar Titles', content: ['Iron Man 2', 'Captain America: The First Avenger', 'Thor'] }
};

const GUARDIANS_OVERVIEW = {
  synopsis: { title: 'Synopsis', content: `Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. To evade Ronan, Quill is forced into an uneasy truce with four disparate misfits: gun-toting Rocket Raccoon, treelike-humanoid Groot, enigmatic Gamora, and vengeance-driven Drax the Destroyer. But when he discovers the orb's true power and the cosmic threat it poses, Quill must rally his ragtag group to save the universe.` },

  // Use block form for these:
  stats: { title: 'Stats', content: { releaseDate: 'August 1, 2014 (USA)', director: 'James Gunn', runTime: '2h 2m', boxOffice: '773.3 million USD', budget: '232.3 million USD', producers: ['James Gunn', 'Nicole Perlman'] } },
  cast: { title: 'Cast', content: ['Chris Pratt (Peter Quill)', 'Zoe Saldana (Gamora)', 'Dave Bautista (Drax)', 'Vin Diesel (Groot)'] },
  similarTitles: { title: 'Similar Titles', content: ['Ant Man', 'Captain America: The Winter Soldier', 'Star Wars: The Force Awakens'] }
};



export default Route.extend({
  model() {
    return {
      ironMan: IRON_MAN_OVERVIEW,
      guardians: GUARDIANS_OVERVIEW
    }
  },

  actions: {
    sectionSelected(/* hash, ev */) {
      // TODO: Animate scrolling here?
    }
  }
});
