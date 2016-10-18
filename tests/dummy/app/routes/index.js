import Route from 'ember-route';

const IPSUM_1 = 'Ye brig wherry chandler spanker grog measured fer yer chains furl Plate Fleet warp. Schooner belaying pin pinnace execution dock cog topsail Chain Shot maroon Yellow Jack jury mast. Swab sheet hogshead jury mast gaff tackle brigantine main sheet Pirate Round gangway.';
const IPSUM_2 = 'Heave to ahoy Jolly Roger maroon scuttle grog Shiver me timbers stern quarter jack. Lanyard hulk cackle fruit loot execution dock shrouds piracy avast scuttle crimp. Mizzen belay clipper bilge Pieces of Eight coffer Sink me nipper grog black jack.';
const IPSUM_3 = 'Cackle fruit American Main six pounders Jack Tar grapple gun maroon hardtack black spot loot. Lad yard jib spyglass interloper holystone parrel fore driver league. Fore barque measured fer yer chains schooner port gangplank wherry scuttle crimp scallywag.';

const GAME_BREAKDOWN = {
  overview: { title: 'Overview', content: IPSUM_1 },
  media: { title: 'Media', content: '' },  // TODO: Use block form
  storyline: { title: 'Storyline', content: IPSUM_2 },
  production: { title: 'Production Details', content: IPSUM_3 },
  similarTitles: { title: 'Similar Titles', content: '' }  // TODO: Use block form
};


export default Route.extend({
  model() {
    return GAME_BREAKDOWN;
  }
});
