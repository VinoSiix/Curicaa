/*
 * Resources Script — Curicaa Curriculum Hub
 * Injects free external resource links into weekly dropdown sections.
 * Uses MutationObserver to re-inject when month content changes.
 */
(function(){

  // --- Resource data: filename key → { month: [ {title, url} per week ] } ---
  var RESOURCES = {
    'ages-5-7-math': {
      'September': [
        {title:'Khan Academy – Counting to 10',url:'https://www.khanacademy.org/math/cc-kindergarten-math/cc-kindergarten-counting'},
        {title:'Khan Academy – Numbers 6-10',url:'https://www.khanacademy.org/math/cc-kindergarten-math'},
        {title:'Starfall – Zero to Ten',url:'https://www.starfall.com/h/numbers/'},
        {title:'ABCya – Connect the Dots',url:'https://www.abcya.com/games/category/math'}
      ],
      'October': [
        {title:'Khan Academy – Teen Numbers',url:'https://www.khanacademy.org/math/cc-kindergarten-math'},
        {title:'Math Playground – Number Bonds',url:'https://www.mathplayground.com/number_bonds_II.html'},
        {title:'ABCya – 100 Number Chart',url:'https://www.abcya.com/games/100_number_grid'},
        {title:'Toy Theater – Counting On',url:'https://www.toytheater.com/number-chart/'}
      ],
      'November': [
        {title:'Khan Academy – Addition to 5',url:'https://www.khanacademy.org/math/cc-kindergarten-math/cc-kindergarten-add-subtract'},
        {title:'Math Playground – Addition Blocks',url:'https://www.mathplayground.com/addition_blocks.html'},
        {title:'Starfall – Addition',url:'https://www.starfall.com/h/numbers/'},
        {title:'ABCya – Marble Math Addition',url:'https://www.abcya.com/games/addition'}
      ],
      'December': [
        {title:'Khan Academy – Subtraction to 5',url:'https://www.khanacademy.org/math/cc-kindergarten-math'},
        {title:'Math Playground – Subtraction Blocks',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Subtraction Game',url:'https://www.abcya.com/games/category/math'},
        {title:'Toy Theater – Fact Families',url:'https://www.toytheater.com/'}
      ],
      'January': [
        {title:'Khan Academy – Shapes',url:'https://www.khanacademy.org/math/cc-kindergarten-math/cc-kindergarten-geometry'},
        {title:'ABCya – Shape Match',url:'https://www.abcya.com/games/category/math'},
        {title:'Math is Fun – 3D Shapes',url:'https://www.mathsisfun.com/geometry/solid-geometry.html'},
        {title:'Toy Theater – Position Words',url:'https://www.toytheater.com/'}
      ],
      'February': [
        {title:'Khan Academy – Measurement',url:'https://www.khanacademy.org/math/cc-kindergarten-math'},
        {title:'ABCya – Fuzz Bugs Graphing',url:'https://www.abcya.com/games/category/math'},
        {title:'Math Playground – Balance Scales',url:'https://www.mathplayground.com/'},
        {title:'Toy Theater – Sorting',url:'https://www.toytheater.com/'}
      ],
      'March': [
        {title:'Khan Academy – Counting to 100',url:'https://www.khanacademy.org/math/cc-1st-grade-math/cc-1st-place-value'},
        {title:'ABCya – 100 Number Grid',url:'https://www.abcya.com/games/100_number_grid'},
        {title:'Math is Fun – Skip Counting',url:'https://www.mathsisfun.com/numbers/skip-counting.html'},
        {title:'Toy Theater – Comparing Numbers',url:'https://www.toytheater.com/'}
      ],
      'April': [
        {title:'Khan Academy – Addition to 10',url:'https://www.khanacademy.org/math/cc-1st-grade-math/cc-1st-add-subtract'},
        {title:'Math Playground – Addition to 10',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Math Facts Basketball',url:'https://www.abcya.com/games/category/math'},
        {title:'Toy Theater – Word Problems',url:'https://www.toytheater.com/'}
      ],
      'May': [
        {title:'Khan Academy – Place Value',url:'https://www.khanacademy.org/math/cc-1st-grade-math/cc-1st-place-value'},
        {title:'Math Playground – Base Ten Blocks',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Base Ten Fun',url:'https://www.abcya.com/games/category/math'},
        {title:'Toy Theater – Place Value Cards',url:'https://www.toytheater.com/place-value-cards/'}
      ],
      'June': [
        {title:'Khan Academy – Money & Time',url:'https://www.khanacademy.org/math/cc-1st-grade-math/cc-1st-time'},
        {title:'ABCya – Learn to Tell Time',url:'https://www.abcya.com/games/category/math'},
        {title:'Math Playground – Geometry Review',url:'https://www.mathplayground.com/index_geometry.html'},
        {title:'Toy Theater – Math Review',url:'https://www.toytheater.com/'}
      ]
    },
    'ages-5-7-english': {
      'September': [
        {title:'Starfall – ABCs',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Alphabet Match',url:'https://www.abcya.com/games/category/reading'},
        {title:'Starfall – Letter Sounds A-M',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Alphabet Bingo',url:'https://www.abcya.com/games/category/reading'}
      ],
      'October': [
        {title:'Starfall – Letter Sounds N-Z',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Rhyming Words',url:'https://www.abcya.com/games/category/reading'},
        {title:'Starfall – Complete the Alphabet',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Syllable Counting',url:'https://www.abcya.com/games/category/reading'}
      ],
      'November': [
        {title:'Starfall – Word Families',url:'https://www.starfall.com/h/word-machines/'},
        {title:'ABCya – CVC Word Match',url:'https://www.abcya.com/games/category/reading'},
        {title:'Reading Bear – Short Vowels',url:'https://www.readingbear.org/'},
        {title:'Starfall – Short E Words',url:'https://www.starfall.com/h/word-machines/'}
      ],
      'December': [
        {title:'ABCya – Sight Word Bingo',url:'https://www.abcya.com/games/category/reading'},
        {title:'Starfall – Sentences',url:'https://www.starfall.com/h/word-machines/'},
        {title:'Starfall – Punctuation',url:'https://www.starfall.com/h/word-machines/'},
        {title:'ABCya – Sight Word Match',url:'https://www.abcya.com/games/category/reading'}
      ],
      'January': [
        {title:'Starfall – Digraphs',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Consonant Blends',url:'https://www.abcya.com/games/category/reading'},
        {title:'Reading Bear – Blends',url:'https://www.readingbear.org/'},
        {title:'Starfall – L and R Blends',url:'https://www.starfall.com/h/abcs/'}
      ],
      'February': [
        {title:'Starfall – Magic E',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Long Vowels',url:'https://www.abcya.com/games/category/reading'},
        {title:'Reading Bear – Silent E',url:'https://www.readingbear.org/'},
        {title:'Starfall – Soft C and G',url:'https://www.starfall.com/h/abcs/'}
      ],
      'March': [
        {title:'ABCya – Story Maker',url:'https://www.abcya.com/games/category/reading'},
        {title:'Storyline Online – Read Alouds',url:'https://www.storylineonline.net/'},
        {title:'ABCya – How To Writing',url:'https://www.abcya.com/games/category/reading'},
        {title:'Storyline Online – Opinion Books',url:'https://www.storylineonline.net/'}
      ],
      'April': [
        {title:'Starfall – Vowel Teams',url:'https://www.starfall.com/h/abcs/'},
        {title:'ABCya – Vowel Team Practice',url:'https://www.abcya.com/games/category/reading'},
        {title:'Reading Bear – Long O & I',url:'https://www.readingbear.org/'},
        {title:'Starfall – Bossy R',url:'https://www.starfall.com/h/abcs/'}
      ],
      'May': [
        {title:'Storyline Online – Read Alouds',url:'https://www.storylineonline.net/'},
        {title:'ABCya – Story Retelling',url:'https://www.abcya.com/games/category/reading'},
        {title:'Starfall – Reading Practice',url:'https://www.starfall.com/h/word-machines/'},
        {title:'Storyline Online – Chapter Books',url:'https://www.storylineonline.net/'}
      ],
      'June': [
        {title:'ABCya – Word Games',url:'https://www.abcya.com/games/category/reading'},
        {title:'Storyline Online – Summer Reading',url:'https://www.storylineonline.net/'},
        {title:'Starfall – Nonfiction Reading',url:'https://www.starfall.com/h/word-machines/'},
        {title:'ABCya – Summer Reading Bingo',url:'https://www.abcya.com/games/category/reading'}
      ]
    },
    'ages-5-7-science': {
      'September': [
        {title:'National Geographic Kids – Plants',url:'https://kids.nationalgeographic.com/science'},
        {title:'Mystery Science – Plant Needs',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Color Changing Flowers',url:'https://www.sciencebuddies.org/stem-activities/color-changing-flowers'},
        {title:'National Geographic Kids – Leaves',url:'https://kids.nationalgeographic.com/science'}
      ],
      'October': [
        {title:'National Geographic Kids – Animals',url:'https://kids.nationalgeographic.com/animals'},
        {title:'Mystery Science – Animal Habitats',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Camouflage',url:'https://kids.nationalgeographic.com/animals'},
        {title:'Science Buddies – Worm Observation',url:'https://www.sciencebuddies.org/'}
      ],
      'November': [
        {title:'NASA Kids Club – Weather',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Weather',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Cloud in a Jar',url:'https://www.sciencebuddies.org/stem-activities/cloud-in-a-jar'},
        {title:'National Geographic Kids – Wind',url:'https://kids.nationalgeographic.com/'}
      ],
      'December': [
        {title:'Mystery Science – Light & Shadows',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Light Sources',url:'https://www.sciencebuddies.org/'},
        {title:'National Geographic Kids – Rainbows',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Rainbow Experiment',url:'https://www.sciencebuddies.org/stem-activities/rainbow-paper'}
      ],
      'January': [
        {title:'Mystery Science – Forces',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Gravity',url:'https://www.sciencebuddies.org/stem-activities/marble-roller-coaster'},
        {title:'Science Buddies – Magnet Science',url:'https://www.sciencebuddies.org/stem-activities/magnetic-slime'},
        {title:'National Geographic Kids – Magnets',url:'https://kids.nationalgeographic.com/'}
      ],
      'February': [
        {title:'Mystery Science – Human Body',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Five Senses',url:'https://www.sciencebuddies.org/'},
        {title:'National Geographic Kids – Germs',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Eggshell Experiment',url:'https://www.sciencebuddies.org/'}
      ],
      'March': [
        {title:'NASA Kids Club – Solar System',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Earth & Space',url:'https://mysteryscience.com/'},
        {title:'NASA – Moon Phases',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'National Geographic Kids – Planets',url:'https://kids.nationalgeographic.com/space'}
      ],
      'April': [
        {title:'Mystery Science – Life Cycles',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Butterflies',url:'https://kids.nationalgeographic.com/animals/invertebrates'},
        {title:'National Geographic Kids – Frogs',url:'https://kids.nationalgeographic.com/animals/amphibians'},
        {title:'Science Buddies – Plant Life Cycle',url:'https://www.sciencebuddies.org/'}
      ],
      'May': [
        {title:'Mystery Science – States of Matter',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Sink or Float',url:'https://www.sciencebuddies.org/stem-activities/sink-or-float'},
        {title:'Science Buddies – Dissolving',url:'https://www.sciencebuddies.org/'},
        {title:'Science Buddies – Baking Soda Volcano',url:'https://www.sciencebuddies.org/stem-activities/volcano'}
      ],
      'June': [
        {title:'National Geographic Kids – Recycling',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Water Filter',url:'https://www.sciencebuddies.org/'},
        {title:'Mystery Science – Review',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Science Fair',url:'https://kids.nationalgeographic.com/'}
      ]
    },
    'ages-5-7-art': {
      'September': [
        {title:'Crayola – Color Mixing',url:'https://www.crayola.com/'},
        {title:'Tate Kids – Line and Shape',url:'https://www.tate.org.uk/kids'},
        {title:'Crayola – Warm & Cool Colors',url:'https://www.crayola.com/'},
        {title:'Tate Kids – Tape Art',url:'https://www.tate.org.uk/kids/make/paint-draw'}
      ],
      'October': [
        {title:'Tate Kids – Leaf Art',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'The Artful Parent – Nature Mandalas',url:'https://artfulparent.com/'},
        {title:'Deep Space Sparkle – Pumpkin Art',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Shadow Art',url:'https://www.tate.org.uk/kids/make/paint-draw'}
      ],
      'November': [
        {title:'Deep Space Sparkle – Self Portraits',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Drawing People',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'The Artful Parent – Family Portraits',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Monster Drawing',url:'https://www.tate.org.uk/kids/make/paint-draw'}
      ],
      'December': [
        {title:'Tate Kids – Paper Snowflakes',url:'https://www.tate.org.uk/kids/make/cut-paste'},
        {title:'Deep Space Sparkle – Winter Dioramas',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Homemade Instruments',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Ribbon Dance',url:'https://www.tate.org.uk/kids/make'}
      ],
      'January': [
        {title:'Deep Space Sparkle – Clay Projects',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Toothpick Structures',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Recycled Art',url:'https://www.tate.org.uk/kids/make/cut-paste'},
        {title:'Deep Space Sparkle – Paper Sculpture',url:'https://www.deepspacesparkle.com/'}
      ],
      'February': [
        {title:'Deep Space Sparkle – Monet Water Lilies',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Matisse Cut-Outs',url:'https://www.tate.org.uk/kids/artists/who-henri-matisse'},
        {title:'Tate Kids – Kandinsky Circles',url:'https://www.tate.org.uk/kids/artists'},
        {title:'The Artful Parent – Pointillism',url:'https://artfulparent.com/'}
      ],
      'March': [
        {title:'The Artful Parent – Body Percussion',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Homemade Instruments',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Painting to Music',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Kids Dance',url:'https://artfulparent.com/'}
      ],
      'April': [
        {title:'Deep Space Sparkle – Printmaking',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Vegetable Printing',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Stamp Art',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'The Artful Parent – Bubble Wrap Print',url:'https://artfulparent.com/'}
      ],
      'May': [
        {title:'The Artful Parent – Sun Prints',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Outdoor Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Sidewalk Chalk',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Kids Photography',url:'https://artfulparent.com/'}
      ],
      'June': [
        {title:'Tate Kids – Art Gallery',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Collaborative Art',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Art Show',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Celebration Art',url:'https://www.tate.org.uk/kids/make'}
      ]
    },
    'age-9-math': {
      'September': [
        {title:'Khan Academy – Place Value to Millions',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Large Numbers',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Comparing Numbers',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Multi-Digit Addition',url:'https://www.ixl.com/math/grade-4'}
      ],
      'October': [
        {title:'Khan Academy – Fraction Basics',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Equivalent Fractions',url:'https://www.mathplayground.com/index_fractions.html'},
        {title:'ABCya – Fraction Fling',url:'https://www.abcya.com/games/category/math'},
        {title:'Math is Fun – Comparing Fractions',url:'https://www.mathsisfun.com/fractions.html'}
      ],
      'November': [
        {title:'Khan Academy – Adding Fractions',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Fraction Addition',url:'https://www.mathplayground.com/index_fractions.html'},
        {title:'ABCya – Mixed Numbers',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Fraction Operations',url:'https://www.ixl.com/math/grade-4'}
      ],
      'December': [
        {title:'Khan Academy – Decimals',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Decimal Games',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Decimal Dash',url:'https://www.abcya.com/games/math-bingo'},
        {title:'Math is Fun – Decimals',url:'https://www.mathsisfun.com/decimals.html'}
      ],
      'January': [
        {title:'Khan Academy – Multi-Digit Multiplication',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Multiplication',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Multiplication Games',url:'https://www.abcya.com/games/math-bingo'},
        {title:'IXL – Long Division',url:'https://www.ixl.com/math/grade-4'}
      ],
      'February': [
        {title:'Khan Academy – Geometry',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Angles',url:'https://www.mathplayground.com/measuringangles.html'},
        {title:'ABCya – Shape Sort',url:'https://www.abcya.com/games/category/math'},
        {title:'Math is Fun – Angles',url:'https://www.mathsisfun.com/angles.html'}
      ],
      'March': [
        {title:'Khan Academy – Measurement',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Area & Perimeter',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Unit Conversion',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Line Plots',url:'https://www.ixl.com/math/grade-4'}
      ],
      'April': [
        {title:'Khan Academy – Factors & Multiples',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Prime Numbers',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Number Patterns',url:'https://www.abcya.com/games/100_number_grid'},
        {title:'Math is Fun – Prime Numbers',url:'https://www.mathsisfun.com/prime_numbers.html'}
      ],
      'May': [
        {title:'Khan Academy – Word Problems',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Logic Puzzles',url:'https://www.mathplayground.com/logicgames.html'},
        {title:'ABCya – Math Review',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Grade 4 Review',url:'https://www.ixl.com/math/grade-4'}
      ],
      'June': [
        {title:'Khan Academy – Grade 4 Review',url:'https://www.khanacademy.org/math/cc-fourth-grade-math'},
        {title:'Math Playground – Games',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Summer Math',url:'https://www.abcya.com/games/math-bingo'},
        {title:'Math is Fun – Puzzles',url:'https://www.mathsisfun.com/'}
      ]
    },
    'age-9-english': {
      'September': [
        {title:'Storyline Online – Chapter Books',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Reading Stamina',url:'https://www.readworks.org/'},
        {title:'ABCya – Story Elements',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Reading Response',url:'https://www.readworks.org/teachers/'}
      ],
      'October': [
        {title:'ReadWorks – Main Idea',url:'https://www.readworks.org/'},
        {title:'National Geographic Kids – Non-Fiction',url:'https://kids.nationalgeographic.com/'},
        {title:'ABCya – Note Taking',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Research Skills',url:'https://www.readworks.org/teachers/'}
      ],
      'November': [
        {title:'ReadWorks – Opinion Writing',url:'https://www.readworks.org/'},
        {title:'ABCya – Persuasive Writing',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Debate',url:'https://www.readworks.org/teachers/'},
        {title:'Storyline Online – Persuasion',url:'https://www.storylineonline.net/'}
      ],
      'December': [
        {title:'Storyline Online – Poetry',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Figurative Language',url:'https://www.readworks.org/'},
        {title:'ABCya – Poetry Creator',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Poetry Writing',url:'https://www.readworks.org/teachers/'}
      ],
      'January': [
        {title:'ABCya – Grammar Games',url:'https://www.abcya.com/games/category/reading'},
        {title:'Grammar Bytes – Parts of Speech',url:'https://www.grammarbytes.com/'},
        {title:'ReadWorks – Punctuation',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Spelling',url:'https://www.vocabulary.com/'}
      ],
      'February': [
        {title:'ReadWorks – Expository Writing',url:'https://www.readworks.org/'},
        {title:'ABCya – Compare & Contrast',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Essay Structure',url:'https://www.readworks.org/teachers/'},
        {title:'Vocabulary.com – Academic Words',url:'https://www.vocabulary.com/'}
      ],
      'March': [
        {title:'Storyline Online – Character Study',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Theme & Main Idea',url:'https://www.readworks.org/'},
        {title:'ABCya – Point of View',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Literature Circles',url:'https://www.readworks.org/teachers/'}
      ],
      'April': [
        {title:'Vocabulary.com – Greek & Latin Roots',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Context Clues',url:'https://www.readworks.org/'},
        {title:'ABCya – Vocabulary Games',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Word Study',url:'https://www.readworks.org/teachers/'}
      ],
      'May': [
        {title:'ABCya – Creative Writing',url:'https://www.abcya.com/games/category/reading'},
        {title:'Storyline Online – Storytelling',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Editing Practice',url:'https://www.readworks.org/'},
        {title:'Scholastic – Publishing',url:'https://www.readworks.org/teachers/'}
      ],
      'June': [
        {title:'Storyline Online – Year Review',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Summer Reading',url:'https://www.readworks.org/'},
        {title:'ABCya – Word Games',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Author\'s Chair',url:'https://www.readworks.org/teachers/'}
      ]
    },
    'age-9-science': {
      'September': [
        {title:'Mystery Science – Energy Forms',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Energy',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – Energy Experiments',url:'https://www.sciencebuddies.org/'},
        {title:'Khan Academy – Energy',url:'https://www.khanacademy.org/science/'}
      ],
      'October': [
        {title:'Science Buddies – Circuits',url:'https://www.sciencebuddies.org/stem-activities/electric-circuits'},
        {title:'Mystery Science – Electricity',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Magnetism',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Electricity',url:'https://kids.nationalgeographic.com/'}
      ],
      'November': [
        {title:'Mystery Science – Waves',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Sound Waves',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Information Transfer',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Waves',url:'https://www.khanacademy.org/science/physics'}
      ],
      'December': [
        {title:'NASA Kids – Earth Systems',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Earth\'s Surface',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Rocks',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Rock Cycle',url:'https://www.sciencebuddies.org/'}
      ],
      'January': [
        {title:'NASA Kids – Solar System',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Space',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Patterns in Space',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Space',url:'https://kids.nationalgeographic.com/space'}
      ],
      'February': [
        {title:'Mystery Science – Plant Structures',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Plant Experiments',url:'https://www.sciencebuddies.org/stem-activities/seed-germination'},
        {title:'Generation Genius – Plant Functions',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Plants',url:'https://kids.nationalgeographic.com/science'}
      ],
      'March': [
        {title:'Mystery Science – Animal Adaptations',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Animals',url:'https://kids.nationalgeographic.com/animals'},
        {title:'Science Buddies – Senses',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Animal Structures',url:'https://www.generationgenius.com/'}
      ],
      'April': [
        {title:'Science Buddies – Engineering Design',url:'https://www.sciencebuddies.org/'},
        {title:'Mystery Science – Engineering',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Design Process',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – Build Challenges',url:'https://www.sciencebuddies.org/stem-activities'}
      ],
      'May': [
        {title:'National Geographic Kids – Environment',url:'https://kids.nationalgeographic.com/'},
        {title:'Mystery Science – Natural Resources',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Conservation',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Human Impact',url:'https://www.generationgenius.com/'}
      ],
      'June': [
        {title:'Science Buddies – Science Fair',url:'https://www.sciencebuddies.org/'},
        {title:'Khan Academy – Science Review',url:'https://www.khanacademy.org/science/'},
        {title:'Mystery Science – Year Review',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Review',url:'https://kids.nationalgeographic.com/'}
      ]
    },
    'age-9-art': {
      'September': [
        {title:'Deep Space Sparkle – Contour Drawing',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Shading',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Drawing Skills',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'YouTube – Drawing for Kids',url:'https://www.youtube.com/results?search_query=drawing+techniques+for+kids'}
      ],
      'October': [
        {title:'Tate Kids – Color Wheel',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'Deep Space Sparkle – Color Theory',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Warm & Cool',url:'https://artfulparent.com/'},
        {title:'Crayola – Color Activities',url:'https://www.crayola.com/'}
      ],
      'November': [
        {title:'Deep Space Sparkle – Sculpture',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Paper Mache',url:'https://artfulparent.com/'},
        {title:'Tate Kids – 3D Art',url:'https://www.tate.org.uk/kids/make/cut-paste'},
        {title:'Crayola – Clay Projects',url:'https://www.crayola.com/crafts/'}
      ],
      'December': [
        {title:'The Artful Parent – Collage',url:'https://artfulparent.com/'},
        {title:'Deep Space Sparkle – Printmaking',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Mixed Media',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Yoga for Kids',url:'https://www.youtube.com/results?search_query=yoga+for+kids'}
      ],
      'January': [
        {title:'Deep Space Sparkle – Monet',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Picasso',url:'https://www.tate.org.uk/kids/artists/who-pablo-picasso'},
        {title:'The Artful Parent – Famous Artists',url:'https://artfulparent.com/'},
        {title:'YouTube – Gymnastics Basics',url:'https://www.youtube.com/results?search_query=gymnastics+for+kids+beginners'}
      ],
      'February': [
        {title:'The Artful Parent – Weaving',url:'https://artfulparent.com/'},
        {title:'Deep Space Sparkle – Textile Art',url:'https://www.deepspacesparkle.com/'},
        {title:'Crayola – Pattern Design',url:'https://www.crayola.com/crafts/'},
        {title:'YouTube – Folk Dance for Kids',url:'https://www.youtube.com/results?search_query=folk+dance+for+kids'}
      ],
      'March': [
        {title:'The Artful Parent – Photography',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Photo Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Photography for Kids',url:'https://www.youtube.com/results?search_query=photography+for+kids'},
        {title:'National Geographic Kids – Outdoor',url:'https://kids.nationalgeographic.com/'}
      ],
      'April': [
        {title:'Tate Kids – Digital Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Graphic Design',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Digital Creation',url:'https://artfulparent.com/'},
        {title:'YouTube – Digital Art for Kids',url:'https://www.youtube.com/results?search_query=digital+art+for+kids'}
      ],
      'May': [
        {title:'Deep Space Sparkle – Exhibition',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Artist Statements',url:'https://www.tate.org.uk/kids/explore'},
        {title:'The Artful Parent – Art Show',url:'https://artfulparent.com/'},
        {title:'YouTube – Leadership Games',url:'https://www.youtube.com/results?search_query=leadership+games+for+kids'}
      ],
      'June': [
        {title:'Tate Kids – Portfolio',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Self Assessment',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Celebration Art',url:'https://artfulparent.com/'},
        {title:'Crayola – Summer Projects',url:'https://www.crayola.com/crafts/'}
      ]
    },
    'age-10-math': {
      'September': [
        {title:'Khan Academy – Place Value & Decimals',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Decimal Games',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Place Value',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Grade 5 Math',url:'https://www.ixl.com/math/grade-5'}
      ],
      'October': [
        {title:'Khan Academy – Multi-Digit Multiplication',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Multiplication',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Math Bingo',url:'https://www.abcya.com/games/math-bingo'},
        {title:'Math is Fun – Multiplication',url:'https://www.mathsisfun.com/numbers/multiplication.html'}
      ],
      'November': [
        {title:'Khan Academy – Division',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Division Games',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Division',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Long Division',url:'https://www.ixl.com/math/grade-5'}
      ],
      'December': [
        {title:'Khan Academy – Adding Fractions',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Fraction Games',url:'https://www.mathplayground.com/index_fractions.html'},
        {title:'ABCya – Fraction Fling',url:'https://www.abcya.com/games/category/math'},
        {title:'Math is Fun – Fractions',url:'https://www.mathsisfun.com/fractions.html'}
      ],
      'January': [
        {title:'Khan Academy – Multiply Fractions',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Fraction Multiply',url:'https://www.mathplayground.com/index_fractions.html'},
        {title:'ABCya – Fraction Games',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Fraction Operations',url:'https://www.ixl.com/math/grade-5'}
      ],
      'February': [
        {title:'Khan Academy – Decimal Operations',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Decimals',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Decimal Games',url:'https://www.abcya.com/games/math-bingo'},
        {title:'Math is Fun – Decimals',url:'https://www.mathsisfun.com/decimals.html'}
      ],
      'March': [
        {title:'Khan Academy – Volume',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Volume',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Measurement',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Measurement',url:'https://www.ixl.com/math/grade-5'}
      ],
      'April': [
        {title:'Khan Academy – Geometry',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Geometry',url:'https://www.mathplayground.com/index_geometry.html'},
        {title:'ABCya – Coordinate Planes',url:'https://www.abcya.com/games/100_number_grid'},
        {title:'Math is Fun – Coordinates',url:'https://www.mathsisfun.com/data/cartesian-coordinates.html'}
      ],
      'May': [
        {title:'Khan Academy – Data & Graphs',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Data',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Graphing',url:'https://www.abcya.com/games/category/math'},
        {title:'IXL – Data Analysis',url:'https://www.ixl.com/math/grade-5'}
      ],
      'June': [
        {title:'Khan Academy – Grade 5 Review',url:'https://www.khanacademy.org/math/cc-fifth-grade-math'},
        {title:'Math Playground – Games',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Math Review',url:'https://www.abcya.com/games/math-bingo'},
        {title:'Math is Fun – Puzzles',url:'https://www.mathsisfun.com/'}
      ]
    },
    'age-10-english': {
      'September': [
        {title:'ReadWorks – Literary Analysis',url:'https://www.readworks.org/'},
        {title:'Storyline Online – Chapter Books',url:'https://www.storylineonline.net/'},
        {title:'Scholastic – Reading Skills',url:'https://www.readworks.org/teachers/'},
        {title:'ABCya – Vocabulary',url:'https://www.abcya.com/games/category/reading'}
      ],
      'October': [
        {title:'ABCya – Story Maker',url:'https://www.abcya.com/games/category/reading'},
        {title:'ReadWorks – Creative Writing',url:'https://www.readworks.org/'},
        {title:'Storyline Online – Narratives',url:'https://www.storylineonline.net/'},
        {title:'Scholastic – Writing Workshop',url:'https://www.readworks.org/teachers/'}
      ],
      'November': [
        {title:'ReadWorks – Informational Text',url:'https://www.readworks.org/'},
        {title:'National Geographic Kids – Research',url:'https://kids.nationalgeographic.com/'},
        {title:'Scholastic – Research Skills',url:'https://www.readworks.org/teachers/'},
        {title:'ABCya – Note Taking',url:'https://www.abcya.com/games/category/reading'}
      ],
      'December': [
        {title:'ReadWorks – Opinion Writing',url:'https://www.readworks.org/'},
        {title:'ABCya – Persuasive Writing',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Argument',url:'https://www.readworks.org/teachers/'},
        {title:'Vocabulary.com – Academic Words',url:'https://www.vocabulary.com/'}
      ],
      'January': [
        {title:'Grammar Bytes – Grammar',url:'https://www.grammarbytes.com/'},
        {title:'ABCya – Grammar Games',url:'https://www.abcya.com/games/category/reading'},
        {title:'ReadWorks – Language',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Conventions',url:'https://www.vocabulary.com/'}
      ],
      'February': [
        {title:'Storyline Online – Poetry',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Figurative Language',url:'https://www.readworks.org/'},
        {title:'ABCya – Poetry Creator',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Poetry',url:'https://www.readworks.org/teachers/'}
      ],
      'March': [
        {title:'ReadWorks – Research Writing',url:'https://www.readworks.org/'},
        {title:'Scholastic – Essay Structure',url:'https://www.readworks.org/teachers/'},
        {title:'ABCya – Writing',url:'https://www.abcya.com/games/category/reading'},
        {title:'National Geographic Kids – Sources',url:'https://kids.nationalgeographic.com/'}
      ],
      'April': [
        {title:'Storyline Online – Classic Literature',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Novel Study',url:'https://www.readworks.org/'},
        {title:'Scholastic – Literature Circles',url:'https://www.readworks.org/teachers/'},
        {title:'Vocabulary.com – Literature',url:'https://www.vocabulary.com/'}
      ],
      'May': [
        {title:'ReadWorks – Media Literacy',url:'https://www.readworks.org/'},
        {title:'ABCya – Public Speaking',url:'https://www.abcya.com/games/category/reading'},
        {title:'Scholastic – Media',url:'https://www.readworks.org/teachers/'},
        {title:'Storyline Online – Performance',url:'https://www.storylineonline.net/'}
      ],
      'June': [
        {title:'Storyline Online – Year Review',url:'https://www.storylineonline.net/'},
        {title:'ReadWorks – Summer Reading',url:'https://www.readworks.org/'},
        {title:'Scholastic – Portfolio',url:'https://www.readworks.org/teachers/'},
        {title:'ABCya – Word Games',url:'https://www.abcya.com/games/category/reading'}
      ]
    },
    'age-10-science': {
      'September': [
        {title:'Mystery Science – Genetics',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Traits',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – DNA',url:'https://www.sciencebuddies.org/'},
        {title:'Khan Academy – Genetics',url:'https://www.khanacademy.org/science/biology/'}
      ],
      'October': [
        {title:'Mystery Science – Matter',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Chemistry',url:'https://www.sciencebuddies.org/stem-activities/chemistry'},
        {title:'Generation Genius – Matter',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Chemistry',url:'https://www.khanacademy.org/science/chemistry'}
      ],
      'November': [
        {title:'Science Buddies – Forces',url:'https://www.sciencebuddies.org/'},
        {title:'Mystery Science – Energy',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Motion',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Forces',url:'https://www.khanacademy.org/science/physics'}
      ],
      'December': [
        {title:'Mystery Science – Human Body',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Body Systems',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Body',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Human Body',url:'https://www.khanacademy.org/science/'}
      ],
      'January': [
        {title:'NASA Kids – Earth Systems',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Earth',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Earth',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Earth Science',url:'https://www.sciencebuddies.org/'}
      ],
      'February': [
        {title:'Mystery Science – Ecosystems',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Environment',url:'https://kids.nationalgeographic.com/'},
        {title:'Science Buddies – Ecology',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Ecosystems',url:'https://www.generationgenius.com/'}
      ],
      'March': [
        {title:'NASA Kids – Astronomy',url:'https://www.nasa.gov/learning-resources/nasa-kids-club/'},
        {title:'Mystery Science – Space',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Space',url:'https://kids.nationalgeographic.com/space'},
        {title:'Science Buddies – Astronomy',url:'https://www.sciencebuddies.org/'}
      ],
      'April': [
        {title:'Mystery Science – Plants',url:'https://mysteryscience.com/'},
        {title:'Science Buddies – Plant Science',url:'https://www.sciencebuddies.org/stem-activities/seed-germination'},
        {title:'Generation Genius – Microbiology',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Plants',url:'https://kids.nationalgeographic.com/science'}
      ],
      'May': [
        {title:'Science Buddies – Engineering',url:'https://www.sciencebuddies.org/'},
        {title:'Mystery Science – Design',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Engineering',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – Build Challenges',url:'https://www.sciencebuddies.org/stem-activities'}
      ],
      'June': [
        {title:'Science Buddies – Science Fair',url:'https://www.sciencebuddies.org/'},
        {title:'Khan Academy – Science Review',url:'https://www.khanacademy.org/science/'},
        {title:'Mystery Science – Review',url:'https://mysteryscience.com/'},
        {title:'National Geographic Kids – Review',url:'https://kids.nationalgeographic.com/'}
      ]
    },
    'age-10-art': {
      'September': [
        {title:'Tate Kids – Elements of Art',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'Deep Space Sparkle – Line & Shape',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Value & Form',url:'https://artfulparent.com/'},
        {title:'YouTube – Art Elements',url:'https://www.youtube.com/results?search_query=elements+of+art+for+kids'}
      ],
      'October': [
        {title:'Deep Space Sparkle – Perspective',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Drawing',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'The Artful Parent – Proportion',url:'https://artfulparent.com/'},
        {title:'YouTube – Perspective Drawing',url:'https://www.youtube.com/results?search_query=perspective+drawing+for+kids'}
      ],
      'November': [
        {title:'Tate Kids – Painting',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'Deep Space Sparkle – Color Theory',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Painting',url:'https://artfulparent.com/'},
        {title:'Crayola – Paint Activities',url:'https://www.crayola.com/'}
      ],
      'December': [
        {title:'The Artful Parent – Collage',url:'https://artfulparent.com/'},
        {title:'Deep Space Sparkle – Mixed Media',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Collage',url:'https://www.tate.org.uk/kids/make/cut-paste'},
        {title:'Crayola – Mixed Media',url:'https://www.crayola.com/crafts/'}
      ],
      'January': [
        {title:'Deep Space Sparkle – Sculpture',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Clay',url:'https://artfulparent.com/'},
        {title:'Tate Kids – 3D Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Clay for Kids',url:'https://www.youtube.com/results?search_query=clay+sculpture+for+kids'}
      ],
      'February': [
        {title:'Tate Kids – Art History',url:'https://www.tate.org.uk/kids/explore'},
        {title:'Deep Space Sparkle – Renaissance',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Modern Art',url:'https://artfulparent.com/'},
        {title:'YouTube – Art History for Kids',url:'https://www.youtube.com/results?search_query=art+history+for+kids'}
      ],
      'March': [
        {title:'Deep Space Sparkle – Printmaking',url:'https://www.deepspacesparkle.com/'},
        {title:'Tate Kids – Print',url:'https://www.tate.org.uk/kids/make'},
        {title:'The Artful Parent – Graphic Design',url:'https://artfulparent.com/'},
        {title:'YouTube – Printmaking for Kids',url:'https://www.youtube.com/results?search_query=printmaking+for+kids'}
      ],
      'April': [
        {title:'The Artful Parent – Photography',url:'https://artfulparent.com/'},
        {title:'Tate Kids – Digital Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Photography Kids',url:'https://www.youtube.com/results?search_query=photography+for+kids'},
        {title:'Deep Space Sparkle – Digital',url:'https://www.deepspacesparkle.com/'}
      ],
      'May': [
        {title:'Tate Kids – World Art',url:'https://www.tate.org.uk/kids/explore'},
        {title:'Deep Space Sparkle – Cultural Art',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Traditions',url:'https://artfulparent.com/'},
        {title:'Crayola – Cultural Crafts',url:'https://www.crayola.com/crafts/'}
      ],
      'June': [
        {title:'Tate Kids – Portfolio',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Exhibition',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Art Show',url:'https://artfulparent.com/'},
        {title:'Crayola – Summer Projects',url:'https://www.crayola.com/crafts/'}
      ]
    },
    'age-10-pe': {
      'September': [
        {title:'YouTube – Fitness for Kids',url:'https://www.youtube.com/results?search_query=fitness+exercises+for+kids'},
        {title:'Cosmic Kids – Yoga',url:'https://www.youtube.com/results?search_query=cosmic+kids+yoga'},
        {title:'GoNoodle – Movement',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Cardio for Kids',url:'https://www.youtube.com/results?search_query=cardio+workout+for+kids'}
      ],
      'October': [
        {title:'YouTube – Soccer Skills',url:'https://www.youtube.com/results?search_query=soccer+skills+for+kids'},
        {title:'GoNoodle – Sports',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Field Sports',url:'https://www.youtube.com/results?search_query=field+sports+for+kids'},
        {title:'Cosmic Kids – Active',url:'https://www.youtube.com/results?search_query=cosmic+kids+active'}
      ],
      'November': [
        {title:'YouTube – Basketball Drills',url:'https://www.youtube.com/results?search_query=basketball+drills+for+kids'},
        {title:'GoNoodle – Basketball',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Court Sports',url:'https://www.youtube.com/results?search_query=court+sports+for+kids'},
        {title:'YouTube – Ball Handling',url:'https://www.youtube.com/results?search_query=ball+handling+drills+kids'}
      ],
      'December': [
        {title:'YouTube – Gymnastics Basics',url:'https://www.youtube.com/results?search_query=gymnastics+for+kids+beginners'},
        {title:'Cosmic Kids – Movement',url:'https://www.youtube.com/results?search_query=cosmic+kids+yoga'},
        {title:'GoNoodle – Stretching',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Balance Exercises',url:'https://www.youtube.com/results?search_query=balance+exercises+for+kids'}
      ],
      'January': [
        {title:'YouTube – Nutrition for Kids',url:'https://www.youtube.com/results?search_query=nutrition+for+kids'},
        {title:'GoNoodle – Healthy Habits',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Wellness',url:'https://www.youtube.com/results?search_query=wellness+for+kids'},
        {title:'Cosmic Kids – Mindfulness',url:'https://www.youtube.com/results?search_query=mindfulness+for+kids'}
      ],
      'February': [
        {title:'YouTube – Volleyball Skills',url:'https://www.youtube.com/results?search_query=volleyball+for+kids'},
        {title:'YouTube – Racquet Sports',url:'https://www.youtube.com/results?search_query=badminton+for+kids'},
        {title:'GoNoodle – Team Sports',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Tennis Basics',url:'https://www.youtube.com/results?search_query=tennis+for+kids+beginners'}
      ],
      'March': [
        {title:'YouTube – Track & Field',url:'https://www.youtube.com/results?search_query=track+and+field+for+kids'},
        {title:'GoNoodle – Running',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Sprinting',url:'https://www.youtube.com/results?search_query=sprinting+technique+for+kids'},
        {title:'YouTube – Field Events',url:'https://www.youtube.com/results?search_query=long+jump+for+kids'}
      ],
      'April': [
        {title:'YouTube – Dance for Kids',url:'https://www.youtube.com/results?search_query=dance+for+kids'},
        {title:'GoNoodle – Dance',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Hip Hop Kids',url:'https://www.youtube.com/results?search_query=hip+hop+dance+for+kids'},
        {title:'Cosmic Kids – Rhythm',url:'https://www.youtube.com/results?search_query=rhythm+activities+for+kids'}
      ],
      'May': [
        {title:'YouTube – Outdoor Adventure',url:'https://www.youtube.com/results?search_query=outdoor+activities+for+kids'},
        {title:'GoNoodle – Outdoor',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Hiking for Kids',url:'https://www.youtube.com/results?search_query=hiking+with+kids'},
        {title:'YouTube – Nature Activities',url:'https://www.youtube.com/results?search_query=nature+activities+for+kids'}
      ],
      'June': [
        {title:'YouTube – Sports Day',url:'https://www.youtube.com/results?search_query=sports+day+activities+kids'},
        {title:'GoNoodle – Celebration',url:'https://www.gonoodle.com/'},
        {title:'YouTube – Fitness Challenge',url:'https://www.youtube.com/results?search_query=fitness+challenge+for+kids'},
        {title:'YouTube – Summer Activities',url:'https://www.youtube.com/results?search_query=summer+activities+for+kids'}
      ]
    },
    // ======================== MIDDLE SCHOOL: Ages 11-12 ========================
    'ages-11-12-math': {
      'September': [
        {title:'Khan Academy – Ratios & Proportions',url:'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic'},
        {title:'Math Playground – Ratio Blaster',url:'https://www.mathplayground.com/ASB_RatioBlaster.html'},
        {title:'IXL – Ratio Reasoning',url:'https://www.ixl.com/math/grade-6'},
        {title:'Math is Fun – Ratios',url:'https://www.mathsisfun.com/numbers/ratio.html'}
      ],
      'October': [
        {title:'Khan Academy – Divide Fractions',url:'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples'},
        {title:'Math Playground – Fraction Division',url:'https://www.mathplayground.com/index_fractions.html'},
        {title:'Math is Fun – GCF & LCM',url:'https://www.mathsisfun.com/greatest-common-factor.html'},
        {title:'ABCya – Fraction Fling',url:'https://www.abcya.com/games/category/math'}
      ],
      'November': [
        {title:'Khan Academy – Rational Numbers',url:'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-negative-number-topic'},
        {title:'Math Playground – Integers',url:'https://www.mathplayground.com/ASB_OrbitIntegers.html'},
        {title:'Math is Fun – Integers',url:'https://www.mathsisfun.com/whole-numbers.html'},
        {title:'IXL – Coordinate Plane',url:'https://www.ixl.com/math/grade-6'}
      ],
      'December': [
        {title:'Khan Academy – Expressions & Equations',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Math Playground – Order of Operations',url:'https://www.mathplayground.com/'},
        {title:'Math is Fun – Expressions',url:'https://www.mathsisfun.com/algebra/'},
        {title:'ABCya – Math Man Jr',url:'https://www.abcya.com/games/category/math'}
      ],
      'January': [
        {title:'Khan Academy – Equations & Inequalities',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Math Playground – Equation Creations',url:'https://www.mathplayground.com/equation_creations.html'},
        {title:'Math is Fun – Solving Equations',url:'https://www.mathsisfun.com/algebra/equations-solving.html'},
        {title:'IXL – One-Step Equations',url:'https://www.ixl.com/math/grade-6'}
      ],
      'February': [
        {title:'Khan Academy – Area & Surface Area',url:'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic'},
        {title:'Math Playground – Area Builder',url:'https://www.mathplayground.com/'},
        {title:'Math is Fun – Surface Area',url:'https://www.mathsisfun.com/geometry/'},
        {title:'Toy Theater – Volume',url:'https://www.toytheater.com/'}
      ],
      'March': [
        {title:'Khan Academy – Statistics',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Math Playground – Data Graphs',url:'https://www.mathplayground.com/'},
        {title:'Math is Fun – Mean Median Mode',url:'https://www.mathsisfun.com/data/frequency-grouped-mean-median-mode.html'},
        {title:'IXL – Statistics',url:'https://www.ixl.com/math/grade-6'}
      ],
      'April': [
        {title:'Khan Academy – Percent Applications',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Math Playground – Percent Panic',url:'https://www.mathplayground.com/'},
        {title:'Math is Fun – Percentages',url:'https://www.mathsisfun.com/percentage.html'},
        {title:'IXL – Percent Problems',url:'https://www.ixl.com/math/grade-6'}
      ],
      'May': [
        {title:'Khan Academy – Variables & Relationships',url:'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-dependent-independent'},
        {title:'Math Playground – Function Machine',url:'https://www.mathplayground.com/FunctionMachine.html'},
        {title:'Math is Fun – Functions',url:'https://www.mathsisfun.com/sets/function.html'},
        {title:'IXL – Graphing Relationships',url:'https://www.ixl.com/math/grade-6'}
      ],
      'June': [
        {title:'Khan Academy – Year Review',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Math Playground – Math Games',url:'https://www.mathplayground.com/'},
        {title:'Math is Fun – Puzzles',url:'https://www.mathsisfun.com/'},
        {title:'ABCya – Math Bingo',url:'https://www.abcya.com/games/math-bingo'}
      ]
    },
    'ages-11-12-english': {
      'September': [
        {title:'ReadWorks – Story Elements',url:'https://www.readworks.org/'},
        {title:'Storyline Online – Fiction Read Alouds',url:'https://storylineonline.net/'},
        {title:'Scholastic – Plot Structure',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'ABCya – Story Maker',url:'https://www.abcya.com/games/category/reading'}
      ],
      'October': [
        {title:'ReadWorks – Author\'s Purpose',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Figurative Language',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Symbolism',url:'https://www.chompchomp.com/'},
        {title:'Scholastic – Theme Workshop',url:'https://www.readworks.org/teachers/teachers/'}
      ],
      'November': [
        {title:'ReadWorks – Argumentative Texts',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Claim & Evidence',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Writing Arguments',url:'https://www.chompchomp.com/'},
        {title:'Scholastic – Persuasive Writing',url:'https://www.readworks.org/teachers/teachers/'}
      ],
      'December': [
        {title:'ReadWorks – Poetry Passages',url:'https://www.readworks.org/'},
        {title:'Poetry Foundation – Poems for Kids',url:'https://www.poetryfoundation.org/learn/children'},
        {title:'Scholastic – Poetry Writing',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Storyline Online – Poetry Readings',url:'https://storylineonline.net/'}
      ],
      'January': [
        {title:'ReadWorks – Informational Texts',url:'https://www.readworks.org/'},
        {title:'Scholastic – Research Skills',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Note-Taking',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Summarizing',url:'https://www.chompchomp.com/'}
      ],
      'February': [
        {title:'ReadWorks – Debate Topics',url:'https://www.readworks.org/'},
        {title:'Scholastic – Debate Workshop',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Persuasive Speaking',url:'https://www.vocabulary.com/'},
        {title:'Storyline Online – Speeches',url:'https://storylineonline.net/'}
      ],
      'March': [
        {title:'ReadWorks – Novel Study',url:'https://www.readworks.org/'},
        {title:'Scholastic – Realistic Fiction',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Character Analysis',url:'https://www.vocabulary.com/'},
        {title:'Storyline Online – Chapter Books',url:'https://storylineonline.net/'}
      ],
      'April': [
        {title:'Grammar Bytes – Clause Types',url:'https://www.chompchomp.com/'},
        {title:'Vocabulary.com – Sentence Variety',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Grammar Practice',url:'https://www.readworks.org/'},
        {title:'Scholastic – Writing Mechanics',url:'https://www.readworks.org/teachers/teachers/'}
      ],
      'May': [
        {title:'ReadWorks – Multicultural Stories',url:'https://www.readworks.org/'},
        {title:'Storyline Online – Diverse Voices',url:'https://storylineonline.net/'},
        {title:'Scholastic – World Literature',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Cultural Context',url:'https://www.vocabulary.com/'}
      ],
      'June': [
        {title:'ReadWorks – Portfolio Reflections',url:'https://www.readworks.org/'},
        {title:'Scholastic – Presentation Skills',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Grammar Bytes – Year Review',url:'https://www.chompchomp.com/'},
        {title:'Storyline Online – Best Of',url:'https://storylineonline.net/'}
      ]
    },
    'ages-11-12-science': {
      'September': [
        {title:'Science Buddies – Scientific Method',url:'https://www.sciencebuddies.org/science-fair-projects/science-fair/steps-of-the-scientific-method'},
        {title:'Khan Academy – Engineering Design',url:'https://www.khanacademy.org/science'},
        {title:'Mystery Science – Inquiry',url:'https://mysteryscience.com/'},
        {title:'Generation Genius – Science Practices',url:'https://www.generationgenius.com/'}
      ],
      'October': [
        {title:'Khan Academy – Earth Systems',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Rocks & Minerals',url:'https://www.sciencebuddies.org/'},
        {title:'National Geographic Kids – Plate Tectonics',url:'https://kids.nationalgeographic.com/'},
        {title:'Generation Genius – Earth\'s Surface',url:'https://www.generationgenius.com/'}
      ],
      'November': [
        {title:'Khan Academy – Weather & Climate',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Water Cycle',url:'https://www.sciencebuddies.org/'},
        {title:'NASA Kids – Weather',url:'https://climatekids.nasa.gov/'},
        {title:'Generation Genius – Water Cycle',url:'https://www.generationgenius.com/'}
      ],
      'December': [
        {title:'Khan Academy – Space Systems',url:'https://www.khanacademy.org/science/cosmology-and-astronomy'},
        {title:'NASA Kids – Solar System',url:'https://spaceplace.nasa.gov/'},
        {title:'Science Buddies – Astronomy',url:'https://www.sciencebuddies.org/'},
        {title:'National Geographic Kids – Space',url:'https://kids.nationalgeographic.com/'}
      ],
      'January': [
        {title:'Khan Academy – Ecosystems',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Food Webs',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Ecosystems',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Animals',url:'https://kids.nationalgeographic.com/animals/'}
      ],
      'February': [
        {title:'Khan Academy – Cells & Organisms',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Cell Biology',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Cells',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Human Body',url:'https://mysteryscience.com/'}
      ],
      'March': [
        {title:'Khan Academy – Matter & Interactions',url:'https://www.khanacademy.org/science/ms-chemistry'},
        {title:'Science Buddies – Chemistry',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Matter',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Chemical Reactions',url:'https://mysteryscience.com/'}
      ],
      'April': [
        {title:'Khan Academy – Forces & Motion',url:'https://www.khanacademy.org/science/ms-physics'},
        {title:'Science Buddies – Physics',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Forces',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Energy',url:'https://mysteryscience.com/'}
      ],
      'May': [
        {title:'Khan Academy – Human Impact',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Environmental Science',url:'https://www.sciencebuddies.org/'},
        {title:'NASA Kids – Climate Change',url:'https://climatekids.nasa.gov/'},
        {title:'National Geographic Kids – Environment',url:'https://kids.nationalgeographic.com/'}
      ],
      'June': [
        {title:'Science Buddies – Science Fair Projects',url:'https://www.sciencebuddies.org/science-fair-projects'},
        {title:'Khan Academy – MS Science Review',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Generation Genius – Review',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Best Of',url:'https://mysteryscience.com/'}
      ]
    },
    'ages-11-12-art': {
      'September': [
        {title:'Tate Kids – Drawing',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'Deep Space Sparkle – Drawing Basics',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Sketching',url:'https://artfulparent.com/'},
        {title:'YouTube – Drawing Fundamentals',url:'https://www.youtube.com/'}
      ],
      'October': [
        {title:'Tate Kids – Colour Mixing',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'Deep Space Sparkle – Watercolor',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Color Theory',url:'https://artfulparent.com/'},
        {title:'Crayola – Watercolor Techniques',url:'https://www.crayola.com/'}
      ],
      'November': [
        {title:'Tate Kids – Renaissance',url:'https://www.tate.org.uk/kids/artists'},
        {title:'Khan Academy – Renaissance Art',url:'https://www.khanacademy.org/humanities/renaissance-reformation'},
        {title:'Deep Space Sparkle – Art History',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Historical Art',url:'https://artfulparent.com/'}
      ],
      'December': [
        {title:'YouTube – Music Theory Basics',url:'https://www.youtube.com/'},
        {title:'Tate Kids – Music & Art',url:'https://www.tate.org.uk/kids/'},
        {title:'Crayola – Musical Instruments Craft',url:'https://www.crayola.com/'},
        {title:'Deep Space Sparkle – Rhythm Art',url:'https://www.deepspacesparkle.com/'}
      ],
      'January': [
        {title:'YouTube – Fitness for Kids',url:'https://www.youtube.com/'},
        {title:'GoNoodle – Movement',url:'https://www.gonoodle.com/'},
        {title:'Cosmic Kids Yoga',url:'https://www.cosmickids.com/'},
        {title:'The Artful Parent – Active Art',url:'https://artfulparent.com/'}
      ],
      'February': [
        {title:'Tate Kids – Impressionism',url:'https://www.tate.org.uk/kids/artists'},
        {title:'Khan Academy – Impressionism',url:'https://www.khanacademy.org/humanities/becoming-modern/avant-garde-france/impressionism'},
        {title:'Deep Space Sparkle – Acrylic Painting',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Painting',url:'https://artfulparent.com/'}
      ],
      'March': [
        {title:'Tate Kids – Sculpture',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Clay Projects',url:'https://www.deepspacesparkle.com/'},
        {title:'Crayola – 3D Art',url:'https://www.crayola.com/'},
        {title:'The Artful Parent – Sculpture',url:'https://artfulparent.com/'}
      ],
      'April': [
        {title:'YouTube – Sports Skills',url:'https://www.youtube.com/'},
        {title:'GoNoodle – Team Activities',url:'https://www.gonoodle.com/'},
        {title:'The Artful Parent – Group Art',url:'https://artfulparent.com/'},
        {title:'Deep Space Sparkle – Collaborative Art',url:'https://www.deepspacesparkle.com/'}
      ],
      'May': [
        {title:'Tate Kids – Digital Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Digital Design',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Tech Art',url:'https://artfulparent.com/'},
        {title:'YouTube – Digital Drawing',url:'https://www.youtube.com/'}
      ],
      'June': [
        {title:'Tate Kids – Make a Gallery',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Portfolio',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Art Show',url:'https://artfulparent.com/'},
        {title:'Crayola – Display Ideas',url:'https://www.crayola.com/'}
      ]
    },
    // ======================== MIDDLE SCHOOL: Age 14 ========================
    'age-14-math': {
      'September': [
        {title:'Khan Academy – Foundations of Algebra',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Algebra Puzzles',url:'https://www.mathplayground.com/'},
        {title:'IXL – Algebra 1',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Algebra',url:'https://www.mathsisfun.com/algebra/'}
      ],
      'October': [
        {title:'Khan Academy – Linear Equations',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Equation Solving',url:'https://www.mathplayground.com/'},
        {title:'IXL – Equations',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Solving Equations',url:'https://www.mathsisfun.com/algebra/equations-solving.html'}
      ],
      'November': [
        {title:'Khan Academy – Functions',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Function Machine',url:'https://www.mathplayground.com/FunctionMachine.html'},
        {title:'IXL – Functions',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Functions',url:'https://www.mathsisfun.com/sets/function.html'}
      ],
      'December': [
        {title:'Khan Academy – Graphing Lines',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Graphing',url:'https://www.mathplayground.com/'},
        {title:'IXL – Linear Functions',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Straight Line Graphs',url:'https://www.mathsisfun.com/data/straight_line_graph.html'}
      ],
      'January': [
        {title:'Khan Academy – Systems of Equations',url:'https://www.khanacademy.org/math/algebra/systems-of-equations'},
        {title:'Math Playground – Systems',url:'https://www.mathplayground.com/'},
        {title:'IXL – Systems',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Simultaneous Equations',url:'https://www.mathsisfun.com/algebra/systems-linear-equations.html'}
      ],
      'February': [
        {title:'Khan Academy – Exponents',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Exponents',url:'https://www.mathplayground.com/'},
        {title:'IXL – Exponents',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Scientific Notation',url:'https://www.mathsisfun.com/numbers/scientific-notation.html'}
      ],
      'March': [
        {title:'Khan Academy – Polynomials',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Polynomial Games',url:'https://www.mathplayground.com/'},
        {title:'IXL – Polynomials',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Polynomials',url:'https://www.mathsisfun.com/algebra/polynomials.html'}
      ],
      'April': [
        {title:'Khan Academy – Factoring',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Factoring',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Quadratic Equations',url:'https://www.mathsisfun.com/algebra/quadratic-equation.html'},
        {title:'Math Playground – Factoring Practice',url:'https://www.mathplayground.com/'}
      ],
      'May': [
        {title:'Khan Academy – Data & Statistics',url:'https://www.khanacademy.org/math/statistics-probability'},
        {title:'Math Playground – Data Graphs',url:'https://www.mathplayground.com/'},
        {title:'IXL – Statistics',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Statistics',url:'https://www.mathsisfun.com/data/'}
      ],
      'June': [
        {title:'Khan Academy – Algebra Review',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Math Playground – Math Games',url:'https://www.mathplayground.com/'},
        {title:'IXL – Algebra Review',url:'https://www.ixl.com/math/algebra-1'},
        {title:'Math is Fun – Puzzles',url:'https://www.mathsisfun.com/'}
      ]
    },
    'age-14-english': {
      'September': [
        {title:'ReadWorks – Short Stories',url:'https://www.readworks.org/'},
        {title:'Scholastic – Narrative Elements',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Character Analysis',url:'https://www.vocabulary.com/'},
        {title:'Storyline Online – Short Fiction',url:'https://storylineonline.net/'}
      ],
      'October': [
        {title:'ReadWorks – Poetry',url:'https://www.readworks.org/'},
        {title:'Poetry Foundation – Teen Poems',url:'https://www.poetryfoundation.org/'},
        {title:'Scholastic – Poetry Writing',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Grammar Bytes – Poetry Analysis',url:'https://www.chompchomp.com/'}
      ],
      'November': [
        {title:'ReadWorks – Novel Study',url:'https://www.readworks.org/'},
        {title:'Scholastic – To Kill a Mockingbird',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Novel Vocabulary',url:'https://www.vocabulary.com/'},
        {title:'Storyline Online – Classic Literature',url:'https://storylineonline.net/'}
      ],
      'December': [
        {title:'ReadWorks – Argumentative Texts',url:'https://www.readworks.org/'},
        {title:'Scholastic – Rhetoric',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Grammar Bytes – Argument Writing',url:'https://www.chompchomp.com/'},
        {title:'Vocabulary.com – Persuasive Words',url:'https://www.vocabulary.com/'}
      ],
      'January': [
        {title:'ReadWorks – Shakespeare',url:'https://www.readworks.org/'},
        {title:'Scholastic – Romeo & Juliet',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Shakespeare Vocab',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Drama Terms',url:'https://www.chompchomp.com/'}
      ],
      'February': [
        {title:'ReadWorks – Research Skills',url:'https://www.readworks.org/'},
        {title:'Scholastic – Research Writing',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Academic Vocabulary',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – MLA Format',url:'https://www.chompchomp.com/'}
      ],
      'March': [
        {title:'ReadWorks – Nonfiction',url:'https://www.readworks.org/'},
        {title:'Scholastic – Informational Texts',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Bias Detection',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Nonfiction Analysis',url:'https://www.chompchomp.com/'}
      ],
      'April': [
        {title:'ReadWorks – Speeches',url:'https://www.readworks.org/'},
        {title:'Scholastic – Public Speaking',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Vocabulary.com – Speaking Skills',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Presentation Writing',url:'https://www.chompchomp.com/'}
      ],
      'May': [
        {title:'Grammar Bytes – Grammar Review',url:'https://www.chompchomp.com/'},
        {title:'Vocabulary.com – Vocabulary Building',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Grammar Practice',url:'https://www.readworks.org/'},
        {title:'Scholastic – Editing Skills',url:'https://www.readworks.org/teachers/teachers/'}
      ],
      'June': [
        {title:'ReadWorks – Year Review',url:'https://www.readworks.org/'},
        {title:'Scholastic – Portfolio',url:'https://www.readworks.org/teachers/teachers/'},
        {title:'Grammar Bytes – Final Review',url:'https://www.chompchomp.com/'},
        {title:'Vocabulary.com – Review',url:'https://www.vocabulary.com/'}
      ]
    },
    'age-14-science': {
      'September': [
        {title:'Khan Academy – Scientific Method',url:'https://www.khanacademy.org/science/biology'},
        {title:'Science Buddies – Lab Safety',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Nature of Science',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Scientific Inquiry',url:'https://mysteryscience.com/'}
      ],
      'October': [
        {title:'Khan Academy – Cell Biology',url:'https://www.khanacademy.org/science/biology'},
        {title:'Science Buddies – Cells',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Cells',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Microscopic World',url:'https://kids.nationalgeographic.com/'}
      ],
      'November': [
        {title:'Khan Academy – Photosynthesis',url:'https://www.khanacademy.org/science/biology/photosynthesis-in-plants'},
        {title:'Science Buddies – Cell Processes',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Plant Science',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Cells & Energy',url:'https://mysteryscience.com/'}
      ],
      'December': [
        {title:'Khan Academy – DNA & Genetics',url:'https://www.khanacademy.org/science/biology/heredity'},
        {title:'Science Buddies – Genetics',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – DNA',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – DNA',url:'https://kids.nationalgeographic.com/'}
      ],
      'January': [
        {title:'Khan Academy – Heredity',url:'https://www.khanacademy.org/science/biology/heredity'},
        {title:'Science Buddies – Biotechnology',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Human Genetics',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Genetics',url:'https://mysteryscience.com/'}
      ],
      'February': [
        {title:'Khan Academy – Evolution',url:'https://www.khanacademy.org/science/biology/heredity/evolution-and-natural-selection'},
        {title:'Science Buddies – Natural Selection',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Evolution',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Evolution',url:'https://kids.nationalgeographic.com/'}
      ],
      'March': [
        {title:'Khan Academy – Ecology',url:'https://www.khanacademy.org/science/biology/ecology'},
        {title:'Science Buddies – Ecosystems',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Ecology',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Ecosystems',url:'https://kids.nationalgeographic.com/'}
      ],
      'April': [
        {title:'Khan Academy – Human Body',url:'https://www.khanacademy.org/science/biology/human-biology'},
        {title:'Science Buddies – Body Systems',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Human Body',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Body Systems',url:'https://mysteryscience.com/'}
      ],
      'May': [
        {title:'Khan Academy – Digestive & Respiratory',url:'https://www.khanacademy.org/science/biology/human-biology'},
        {title:'Science Buddies – Body Systems Part 2',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Classification',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Animal Classification',url:'https://kids.nationalgeographic.com/'}
      ],
      'June': [
        {title:'Science Buddies – Science Fair',url:'https://www.sciencebuddies.org/science-fair-projects'},
        {title:'Khan Academy – Biology Review',url:'https://www.khanacademy.org/science/biology'},
        {title:'Generation Genius – Year Review',url:'https://www.generationgenius.com/'},
        {title:'Mystery Science – Best Of',url:'https://mysteryscience.com/'}
      ]
    },
    'age-14-social-studies': {
      'September': [
        {title:'Tate Kids – Drawing Foundations',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'YouTube – Drawing Basics',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Contour Drawing',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Shading',url:'https://artfulparent.com/'}
      ],
      'October': [
        {title:'Tate Kids – Colour',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'YouTube – Color Theory',url:'https://www.youtube.com/'},
        {title:'Crayola – Color Mixing',url:'https://www.crayola.com/'},
        {title:'Deep Space Sparkle – Warm & Cool',url:'https://www.deepspacesparkle.com/'}
      ],
      'November': [
        {title:'Tate Kids – Painting',url:'https://www.tate.org.uk/kids/make/paint-draw'},
        {title:'YouTube – Watercolor Basics',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Painting',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Flexibility',url:'https://artfulparent.com/'}
      ],
      'December': [
        {title:'Tate Kids – Printmaking',url:'https://www.tate.org.uk/kids/'},
        {title:'YouTube – Printmaking for Kids',url:'https://www.youtube.com/'},
        {title:'Crayola – Holiday Crafts',url:'https://www.crayola.com/'},
        {title:'Deep Space Sparkle – Print & Stamp',url:'https://www.deepspacesparkle.com/'}
      ],
      'January': [
        {title:'Tate Kids – Sculpture',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Clay Sculpture',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – 3D Art',url:'https://www.deepspacesparkle.com/'},
        {title:'Crayola – Sculpture Ideas',url:'https://www.crayola.com/'}
      ],
      'February': [
        {title:'Tate Kids – Digital Art',url:'https://www.tate.org.uk/kids/make'},
        {title:'YouTube – Digital Drawing',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Digital Design',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Digital Art',url:'https://artfulparent.com/'}
      ],
      'March': [
        {title:'Tate Kids – Photography',url:'https://www.tate.org.uk/kids/'},
        {title:'YouTube – Photography for Kids',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Photography',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Composition',url:'https://artfulparent.com/'}
      ],
      'April': [
        {title:'Tate Kids – Mixed Media',url:'https://www.tate.org.uk/kids/'},
        {title:'YouTube – Collage Art',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Collage',url:'https://www.deepspacesparkle.com/'},
        {title:'Crayola – Mixed Media',url:'https://www.crayola.com/'}
      ],
      'May': [
        {title:'Tate Kids – Art History',url:'https://www.tate.org.uk/kids/artists'},
        {title:'Khan Academy – Art History',url:'https://www.khanacademy.org/humanities/art-history'},
        {title:'YouTube – Art History for Kids',url:'https://www.youtube.com/'},
        {title:'Deep Space Sparkle – Art History',url:'https://www.deepspacesparkle.com/'}
      ],
      'June': [
        {title:'Tate Kids – Portfolio',url:'https://www.tate.org.uk/kids/make'},
        {title:'Deep Space Sparkle – Art Show',url:'https://www.deepspacesparkle.com/'},
        {title:'The Artful Parent – Gallery',url:'https://artfulparent.com/'},
        {title:'Crayola – Display Ideas',url:'https://www.crayola.com/'}
      ]
    },
    // ======================== HIGH SCHOOL: Ages 15-16 ========================
    'ages-15-16-math': {
      'September': [
        {title:'Khan Academy – Number Sense',url:'https://www.khanacademy.org/math/arithmetic'},
        {title:'IXL – Integer Operations',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Fractions & Decimals',url:'https://www.mathsisfun.com/fractions.html'},
        {title:'Math Playground – Number Practice',url:'https://www.mathplayground.com/'}
      ],
      'October': [
        {title:'Khan Academy – Ratios & Proportions',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'IXL – Ratios & Rates',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Percentages',url:'https://www.mathsisfun.com/percentage.html'},
        {title:'Math Playground – Ratio Games',url:'https://www.mathplayground.com/'}
      ],
      'November': [
        {title:'Khan Academy – Linear Equations',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Equations',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Systems of Equations',url:'https://www.mathsisfun.com/algebra/systems-linear-equations.html'},
        {title:'Math Playground – Algebra Puzzles',url:'https://www.mathplayground.com/'}
      ],
      'December': [
        {title:'Khan Academy – Functions & Graphing',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Linear Functions',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Function Grapher',url:'https://www.mathsisfun.com/data/function-grapher.php'},
        {title:'Math Playground – Graphing',url:'https://www.mathplayground.com/'}
      ],
      'January': [
        {title:'Khan Academy – Geometry',url:'https://www.khanacademy.org/math/geometry'},
        {title:'IXL – Area & Volume',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Geometry',url:'https://www.mathsisfun.com/geometry/'},
        {title:'Math Playground – Geometry Games',url:'https://www.mathplayground.com/'}
      ],
      'February': [
        {title:'Khan Academy – Angles & Transformations',url:'https://www.khanacademy.org/math/geometry/hs-geo-transformations'},
        {title:'IXL – Transformations',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Angles',url:'https://www.mathsisfun.com/angles.html'},
        {title:'Math Playground – Transformation Games',url:'https://www.mathplayground.com/'}
      ],
      'March': [
        {title:'Khan Academy – Statistics & Probability',url:'https://www.khanacademy.org/math/statistics-probability'},
        {title:'IXL – Statistics',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Probability',url:'https://www.mathsisfun.com/data/probability.html'},
        {title:'Math Playground – Data Games',url:'https://www.mathplayground.com/'}
      ],
      'April': [
        {title:'Khan Academy – Polynomials',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Factoring',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Quadratics',url:'https://www.mathsisfun.com/algebra/quadratic-equation.html'},
        {title:'Math Playground – Advanced Algebra',url:'https://www.mathplayground.com/'}
      ],
      'May': [
        {title:'Khan Academy – Word Problems',url:'https://www.khanacademy.org/math/'},
        {title:'IXL – Problem Solving',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Puzzles',url:'https://www.mathsisfun.com/'},
        {title:'Math Playground – Logic Games',url:'https://www.mathplayground.com/logicgames.html'}
      ],
      'June': [
        {title:'Khan Academy – GED Math',url:'https://www.khanacademy.org/math/'},
        {title:'IXL – GED Review',url:'https://www.ixl.com/math/'},
        {title:'Math is Fun – Review',url:'https://www.mathsisfun.com/'},
        {title:'Math Playground – Math Games',url:'https://www.mathplayground.com/'}
      ]
    },
    'ages-15-16-english': {
      'September': [
        {title:'ReadWorks – Reading Comprehension',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Reading & Language Arts',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Vocabulary Practice',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Grammar',url:'https://www.chompchomp.com/'}
      ],
      'October': [
        {title:'ReadWorks – Arguments',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Author\'s Purpose',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Argument Analysis',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Point of View',url:'https://www.chompchomp.com/'}
      ],
      'November': [
        {title:'Grammar Bytes – Sentence Structure',url:'https://www.chompchomp.com/'},
        {title:'Khan Academy – Grammar',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Grammar Terms',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Grammar Passages',url:'https://www.readworks.org/'}
      ],
      'December': [
        {title:'Khan Academy – Essay Writing',url:'https://www.khanacademy.org/ela'},
        {title:'ReadWorks – Extended Response',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Academic Writing',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Writing Skills',url:'https://www.chompchomp.com/'}
      ],
      'January': [
        {title:'ReadWorks – Literary Fiction',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Literature',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Literature Terms',url:'https://www.vocabulary.com/'},
        {title:'Storyline Online – Fiction',url:'https://storylineonline.net/'}
      ],
      'February': [
        {title:'ReadWorks – Informational Texts',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Nonfiction',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Workplace Vocabulary',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Nonfiction Analysis',url:'https://www.chompchomp.com/'}
      ],
      'March': [
        {title:'Grammar Bytes – Editing Skills',url:'https://www.chompchomp.com/'},
        {title:'Khan Academy – Language',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Word Choice',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Language Practice',url:'https://www.readworks.org/'}
      ],
      'April': [
        {title:'ReadWorks – US Documents',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Foundational Documents',url:'https://www.khanacademy.org/humanities/us-history'},
        {title:'Vocabulary.com – Historical Terms',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Document Analysis',url:'https://www.chompchomp.com/'}
      ],
      'May': [
        {title:'Khan Academy – Test Strategies',url:'https://www.khanacademy.org/ela'},
        {title:'ReadWorks – Timed Practice',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – Test Prep',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Speed Practice',url:'https://www.chompchomp.com/'}
      ],
      'June': [
        {title:'ReadWorks – GED Practice',url:'https://www.readworks.org/'},
        {title:'Khan Academy – GED RLA',url:'https://www.khanacademy.org/ela'},
        {title:'Vocabulary.com – Final Review',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Final Review',url:'https://www.chompchomp.com/'}
      ]
    },
    'ages-15-16-science': {
      'September': [
        {title:'Khan Academy – Scientific Method',url:'https://www.khanacademy.org/science/'},
        {title:'Science Buddies – Data Analysis',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Science Practices',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Reading Graphs',url:'https://www.khanacademy.org/math/statistics-probability'}
      ],
      'October': [
        {title:'Khan Academy – Cell Biology',url:'https://www.khanacademy.org/science/biology'},
        {title:'Science Buddies – Genetics',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – DNA & Heredity',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Heredity',url:'https://www.khanacademy.org/science/biology/heredity'}
      ],
      'November': [
        {title:'Khan Academy – Ecology',url:'https://www.khanacademy.org/science/biology/ecology'},
        {title:'Science Buddies – Ecosystems',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Body Systems',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Ecosystems',url:'https://kids.nationalgeographic.com/'}
      ],
      'December': [
        {title:'Khan Academy – Chemistry',url:'https://www.khanacademy.org/science/chemistry'},
        {title:'Science Buddies – Matter',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Matter & Chemistry',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Periodic Table',url:'https://www.khanacademy.org/science/chemistry/atomic-structure'}
      ],
      'January': [
        {title:'Khan Academy – Physics',url:'https://www.khanacademy.org/science/physics'},
        {title:'Science Buddies – Forces & Motion',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Energy',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Newton\'s Laws',url:'https://www.khanacademy.org/science/physics/forces-newtons-laws'}
      ],
      'February': [
        {title:'Khan Academy – Earth Science',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'Science Buddies – Geology',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Earth\'s Surface',url:'https://www.generationgenius.com/'},
        {title:'National Geographic Kids – Geology',url:'https://kids.nationalgeographic.com/'}
      ],
      'March': [
        {title:'Khan Academy – Weather & Climate',url:'https://www.khanacademy.org/science/ms-biology'},
        {title:'NASA Kids – Climate',url:'https://climatekids.nasa.gov/'},
        {title:'Science Buddies – Space Science',url:'https://www.sciencebuddies.org/'},
        {title:'NASA Space Place – Solar System',url:'https://spaceplace.nasa.gov/'}
      ],
      'April': [
        {title:'Khan Academy – Science Reasoning',url:'https://www.khanacademy.org/science/'},
        {title:'Science Buddies – Experiments',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Scientific Analysis',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – Passage Analysis',url:'https://www.sciencebuddies.org/'}
      ],
      'May': [
        {title:'Khan Academy – Test Strategies',url:'https://www.khanacademy.org/science/'},
        {title:'Science Buddies – Timed Practice',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Review',url:'https://www.generationgenius.com/'},
        {title:'Khan Academy – Science Review',url:'https://www.khanacademy.org/science/'}
      ],
      'June': [
        {title:'Khan Academy – GED Science',url:'https://www.khanacademy.org/science/'},
        {title:'Science Buddies – GED Practice',url:'https://www.sciencebuddies.org/'},
        {title:'Generation Genius – Final Review',url:'https://www.generationgenius.com/'},
        {title:'Science Buddies – Full Review',url:'https://www.sciencebuddies.org/'}
      ]
    },
    'ages-15-16-social-studies': {
      'September': [
        {title:'Khan Academy – US Government',url:'https://www.khanacademy.org/humanities/us-government-and-civics'},
        {title:'iCivics – Constitution',url:'https://www.icivics.org/'},
        {title:'National Geographic Kids – Government',url:'https://kids.nationalgeographic.com/'},
        {title:'Khan Academy – Bill of Rights',url:'https://www.khanacademy.org/humanities/us-government-and-civics'}
      ],
      'October': [
        {title:'Khan Academy – Branches of Government',url:'https://www.khanacademy.org/humanities/us-government-and-civics'},
        {title:'iCivics – Government Branches',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Checks & Balances',url:'https://www.khanacademy.org/humanities/us-government-and-civics'},
        {title:'iCivics – Civic Simulations',url:'https://www.icivics.org/'}
      ],
      'November': [
        {title:'Khan Academy – US History',url:'https://www.khanacademy.org/humanities/us-history'},
        {title:'iCivics – History',url:'https://www.icivics.org/'},
        {title:'National Geographic Kids – History',url:'https://kids.nationalgeographic.com/'},
        {title:'Khan Academy – WWI',url:'https://www.khanacademy.org/humanities/us-history'}
      ],
      'December': [
        {title:'Khan Academy – World History',url:'https://www.khanacademy.org/humanities/world-history'},
        {title:'National Geographic Kids – World',url:'https://kids.nationalgeographic.com/'},
        {title:'Khan Academy – Cold War',url:'https://www.khanacademy.org/humanities/world-history'},
        {title:'iCivics – Global Issues',url:'https://www.icivics.org/'}
      ],
      'January': [
        {title:'Khan Academy – Economics',url:'https://www.khanacademy.org/economics-finance-domain'},
        {title:'iCivics – Economics',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Supply & Demand',url:'https://www.khanacademy.org/economics-finance-domain/microeconomics'},
        {title:'Khan Academy – Personal Finance',url:'https://www.khanacademy.org/college-careers-more/personal-finance'}
      ],
      'February': [
        {title:'Khan Academy – Elections',url:'https://www.khanacademy.org/humanities/us-government-and-civics'},
        {title:'iCivics – Voting',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Political Parties',url:'https://www.khanacademy.org/humanities/us-government-and-civics'},
        {title:'iCivics – Civic Participation',url:'https://www.icivics.org/'}
      ],
      'March': [
        {title:'Khan Academy – Civil Rights',url:'https://www.khanacademy.org/humanities/us-history'},
        {title:'iCivics – Civil Rights',url:'https://www.icivics.org/'},
        {title:'National Geographic Kids – Civil Rights',url:'https://kids.nationalgeographic.com/'},
        {title:'Khan Academy – Modern America',url:'https://www.khanacademy.org/humanities/us-history'}
      ],
      'April': [
        {title:'National Geographic Kids – Geography',url:'https://kids.nationalgeographic.com/'},
        {title:'Khan Academy – Geography',url:'https://www.khanacademy.org/humanities/'},
        {title:'iCivics – Geography',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Migration',url:'https://www.khanacademy.org/humanities/'}
      ],
      'May': [
        {title:'Khan Academy – GED Writing',url:'https://www.khanacademy.org/ela'},
        {title:'iCivics – Essay Practice',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Source Analysis',url:'https://www.khanacademy.org/humanities/'},
        {title:'Grammar Bytes – Extended Response',url:'https://www.chompchomp.com/'}
      ],
      'June': [
        {title:'Khan Academy – GED Social Studies',url:'https://www.khanacademy.org/humanities/'},
        {title:'iCivics – GED Review',url:'https://www.icivics.org/'},
        {title:'Khan Academy – Full Review',url:'https://www.khanacademy.org/humanities/us-history'},
        {title:'iCivics – Practice Tests',url:'https://www.icivics.org/'}
      ]
    },
    // ======================== HIGH SCHOOL: Ages 17-18 ========================
    'ages-17-18-math': {
      'September': [
        {title:'Khan Academy – Linear Equations',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Khan Academy – Systems of Equations',url:'https://www.khanacademy.org/math/algebra/systems-of-equations'},
        {title:'IXL – SAT Math',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'October': [
        {title:'Khan Academy – Ratios & Proportions',url:'https://www.khanacademy.org/math/cc-sixth-grade-math'},
        {title:'Khan Academy – Statistics & Probability',url:'https://www.khanacademy.org/math/statistics-probability'},
        {title:'IXL – Data Analysis',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Math Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'November': [
        {title:'Khan Academy – Quadratics',url:'https://www.khanacademy.org/math/algebra2'},
        {title:'Khan Academy – Polynomials',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Quadratic Equations',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Algebra',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'December': [
        {title:'Khan Academy – Functions',url:'https://www.khanacademy.org/math/algebra'},
        {title:'Khan Academy – Transformations',url:'https://www.khanacademy.org/math/algebra'},
        {title:'IXL – Function Notation',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Functions',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'January': [
        {title:'Khan Academy – Geometry',url:'https://www.khanacademy.org/math/geometry'},
        {title:'Khan Academy – Triangles',url:'https://www.khanacademy.org/math/geometry/hs-geo-trig'},
        {title:'IXL – Geometry',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Geometry',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'February': [
        {title:'Khan Academy – Circles',url:'https://www.khanacademy.org/math/geometry/hs-geo-circles'},
        {title:'Khan Academy – Volume',url:'https://www.khanacademy.org/math/geometry/hs-geo-solids'},
        {title:'IXL – Circle Geometry',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Geometry Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'March': [
        {title:'Khan Academy – Rational Expressions',url:'https://www.khanacademy.org/math/algebra2'},
        {title:'Khan Academy – Radical Equations',url:'https://www.khanacademy.org/math/algebra2'},
        {title:'IXL – Advanced Algebra',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – SAT Advanced Math',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'April': [
        {title:'Khan Academy – SAT Full Practice',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Khan Academy – SAT Strategy',url:'https://www.khanacademy.org/digital-sat'},
        {title:'IXL – SAT Review',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – Official SAT Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'May': [
        {title:'Khan Academy – SAT Score Boost',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Khan Academy – Weak Areas',url:'https://www.khanacademy.org/digital-sat'},
        {title:'IXL – Targeted Practice',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – Grid-In Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'June': [
        {title:'Khan Academy – Final SAT Practice',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Khan Academy – Test Day Tips',url:'https://www.khanacademy.org/digital-sat'},
        {title:'IXL – Final Review',url:'https://www.ixl.com/math/'},
        {title:'Khan Academy – College Readiness',url:'https://www.khanacademy.org/college-careers-more'}
      ]
    },
    'ages-17-18-english': {
      'September': [
        {title:'Khan Academy – SAT Reading',url:'https://www.khanacademy.org/digital-sat'},
        {title:'ReadWorks – Reading Comprehension',url:'https://www.readworks.org/'},
        {title:'Vocabulary.com – SAT Vocabulary',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Reading Test Practice',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'October': [
        {title:'Khan Academy – Words in Context',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Vocabulary.com – Context Clues',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Craft & Structure',url:'https://www.khanacademy.org/digital-sat'},
        {title:'ReadWorks – Author\'s Technique',url:'https://www.readworks.org/'}
      ],
      'November': [
        {title:'Grammar Bytes – Grammar Review',url:'https://www.chompchomp.com/'},
        {title:'Khan Academy – SAT Grammar',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Vocabulary.com – Grammar Terms',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Standard English',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'December': [
        {title:'Grammar Bytes – Punctuation',url:'https://www.chompchomp.com/'},
        {title:'Khan Academy – SAT Punctuation',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Vocabulary.com – Punctuation Rules',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Writing & Language',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'January': [
        {title:'Khan Academy – Transitions & Rhetoric',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Grammar Bytes – Transitions',url:'https://www.chompchomp.com/'},
        {title:'Vocabulary.com – Rhetorical Terms',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Expression of Ideas',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'February': [
        {title:'Khan Academy – College Essay',url:'https://www.khanacademy.org/college-careers-more'},
        {title:'Vocabulary.com – Essay Vocabulary',url:'https://www.vocabulary.com/'},
        {title:'Grammar Bytes – Essay Writing',url:'https://www.chompchomp.com/'},
        {title:'Khan Academy – Writing Workshop',url:'https://www.khanacademy.org/college-careers-more'}
      ],
      'March': [
        {title:'Vocabulary.com – SAT Words',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Advanced Reading',url:'https://www.khanacademy.org/digital-sat'},
        {title:'ReadWorks – Complex Texts',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Vocabulary Building',url:'https://www.khanacademy.org/digital-sat'}
      ],
      'April': [
        {title:'Khan Academy – SAT Timed Practice',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Khan Academy – Digital SAT Strategy',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Vocabulary.com – Speed Practice',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Timed Reading',url:'https://www.readworks.org/'}
      ],
      'May': [
        {title:'Khan Academy – Score Maximization',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Vocabulary.com – Weak Areas',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Error Analysis',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Grammar Bytes – Final Review',url:'https://www.chompchomp.com/'}
      ],
      'June': [
        {title:'Khan Academy – Final SAT Practice',url:'https://www.khanacademy.org/digital-sat'},
        {title:'Khan Academy – College Applications',url:'https://www.khanacademy.org/college-careers-more'},
        {title:'Vocabulary.com – Final Review',url:'https://www.vocabulary.com/'},
        {title:'ReadWorks – Final Practice',url:'https://www.readworks.org/'}
      ]
    },
    'age-8-math': {
      'September': [
        {title:'Khan Academy – Place Value (Base Ten)',url:'https://www.khanacademy.org/math/cc-2nd-grade-math/cc-2nd-place-value'},
        {title:'Math Playground – Round to Nearest 10',url:'https://www.mathplayground.com/'},
        {title:'Khan Academy – Rounding to 100',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math is Fun – Addition & Subtraction Patterns',url:'https://www.mathsisfun.com/'}
      ],
      'October': [
        {title:'Khan Academy – Multiplication as Equal Groups',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Multiplication with Arrays',url:'https://www.khanacademy.org/math/cc-third-grade-math/cc-third-grade-multiplication-and-division/cc-third-grade-arrays-mult/v/multiplication-with-arrays'},
        {title:'Math Playground – Multiplication 2s, 5s, 10s',url:'https://www.mathplayground.com/'},
        {title:'ABCya – Multiplication Mine',url:'https://www.abcya.com/games/category/math'}
      ],
      'November': [
        {title:'Khan Academy – Division as Sharing',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/division-2'},
        {title:'Khan Academy – Division as Grouping',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math Playground – Fact Families',url:'https://www.mathplayground.com/'},
        {title:'IXL – Division Word Problems',url:'https://www.ixl.com/math/grade-3/division-word-problems'}
      ],
      'December': [
        {title:'Khan Academy – Tally Charts & Data',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math is Fun – Picture Graphs',url:'https://www.mathsisfun.com/data/pictographs.html'},
        {title:'Khan Academy – Bar Graphs',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math Playground – Line Plots',url:'https://www.mathplayground.com/grade_3_games.html'}
      ],
      'January': [
        {title:'Khan Academy – Polygon Attributes',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/quadrilateral-overview'},
        {title:'Khan Academy – Quadrilaterals',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Intro to Area',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math is Fun – Perimeter vs. Area',url:'https://www.mathsisfun.com/area.html'}
      ],
      'February': [
        {title:'Khan Academy – Telling Time to the Minute',url:'https://www.khanacademy.org/math/cc-third-grade-math/cc-third-grade-measurement/cc-third-grade-time/v/telling-time-exercise-example-1'},
        {title:'Math Playground – Elapsed Time',url:'https://www.mathplayground.com/'},
        {title:'Khan Academy – Liquid Volume',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Mass & Weight',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/mass-and-volume-word-problem'}
      ],
      'March': [
        {title:'Khan Academy – Unit Fractions',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Building Fractions',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Fractions on Number Line',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Khan Academy – Equivalent Fractions',url:'https://www.khanacademy.org/math/cc-third-grade-math'}
      ],
      'April': [
        {title:'Khan Academy – Area & Multiplication',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/finding-area-by-multiplying'},
        {title:'Khan Academy – Area & Distributive Property',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/area-and-the-distributive-property'},
        {title:'Khan Academy – Area of Irregular Shapes',url:'https://www.khanacademy.org/math/cc-third-grade-math/v/decomposing-shapes-to-find-area-grids'},
        {title:'Math Playground – Perimeter vs Area',url:'https://www.mathplayground.com/'}
      ],
      'May': [
        {title:'Khan Academy – Find the Unknown',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math Playground – Number Patterns',url:'https://www.mathplayground.com/'},
        {title:'Khan Academy – Two-Step Word Problems',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'Math is Fun – Estimation',url:'https://www.mathsisfun.com/numbers/estimation.html'}
      ],
      'June': [
        {title:'Khan Academy – 3rd Grade Review',url:'https://www.khanacademy.org/math/cc-third-grade-math'},
        {title:'IXL – 3rd Grade Math Skills',url:'https://www.ixl.com/math/grade-3'},
        {title:'Math Playground – 3rd Grade Games',url:'https://www.mathplayground.com/grade_3_games.html'},
        {title:'Khan Academy – Math Mission Recap',url:'https://www.khanacademy.org/math/cc-third-grade-math'}
      ]
    },
    'age-8-english': {
      'September': [
        {title:'ReadWorks – Reading Comprehension',url:'https://www.readworks.org/article-a-day'},
        {title:'ReadWriteThink – Story Elements',url:'https://www.readwritethink.org/classroom-resources/lesson-plans/sharing-favorite-books-using'},
        {title:'CommonLit – 3rd Grade Plot',url:'https://www.commonlit.org/'},
        {title:'Storyline Online – Read-Alouds',url:'https://storylineonline.net/'}
      ],
      'October': [
        {title:'ReadWriteThink – Narrative Ideas',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'ReadWriteThink – Story Map',url:'https://www.readwritethink.org/classroom-resources/student-interactives/story-30008.html'},
        {title:'ReadWriteThink – Show Don\u2019t Tell',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Purdue OWL – Revising & Editing',url:'https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/index.html'}
      ],
      'November': [
        {title:'Khan Academy – Nouns',url:'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-noun'},
        {title:'Khan Academy – Verbs',url:'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-verb'},
        {title:'Khan Academy – Adjectives',url:'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-modifier'},
        {title:'Khan Academy – Sentences & Paragraphs',url:'https://www.khanacademy.org/humanities/grammar'}
      ],
      'December': [
        {title:'ReadWorks – Non-Fiction Text Features',url:'https://www.readworks.org/article-a-day'},
        {title:'ReadWriteThink – Main Idea',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'AVID – Note-Taking for Kids',url:'https://www.avid.org/'},
        {title:'ReadWriteThink – Summarizing',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'}
      ],
      'January': [
        {title:'Khan Academy – Fact vs. Opinion',url:'https://www.khanacademy.org/ela'},
        {title:'ReadWriteThink – Opinion Writing',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Purdue OWL – Linking Words',url:'https://owl.purdue.edu/owl/general_writing/mechanics/transitions_and_transitional_devices/index.html'},
        {title:'ReadWriteThink – Persuasive Letters',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'}
      ],
      'February': [
        {title:'Vocabulary.com – Prefixes',url:'https://www.vocabulary.com/lists/52473'},
        {title:'Vocabulary.com – Suffixes',url:'https://www.vocabulary.com/'},
        {title:'Khan Academy – Context Clues',url:'https://www.khanacademy.org/ela'},
        {title:'ABCya – Dictionary Skills',url:'https://www.abcya.com/games/category/reading'}
      ],
      'March': [
        {title:'Poetry Foundation – Poetry for Kids',url:'https://www.poetryfoundation.org/learn/children'},
        {title:'ReadWriteThink – Similes & Metaphors',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Poetry4Kids – Sound Devices',url:'https://www.poetry4kids.com/lessons/'},
        {title:'ReadWriteThink – Poetry Forms',url:'https://www.readwritethink.org/classroom-resources/student-interactives'}
      ],
      'April': [
        {title:'Storyline Online – Fairy Tales',url:'https://storylineonline.net/'},
        {title:'ReadWriteThink – Comparing Tales',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Aesop\u2019s Fables – Library of Congress',url:'https://www.read.gov/aesop/'},
        {title:'ReadWriteThink – Fractured Fairy Tales',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'}
      ],
      'May': [
        {title:'ReadWriteThink – Research Topics',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Britannica Kids – Research',url:'https://kids.britannica.com/'},
        {title:'ReadWriteThink – Organizing Info',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'Purdue OWL – Editing & Publishing',url:'https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/index.html'}
      ],
      'June': [
        {title:'ReadWorks – Fluency Review',url:'https://www.readworks.org/'},
        {title:'Khan Academy – Grammar Review',url:'https://www.khanacademy.org/humanities/grammar'},
        {title:'Poetry Foundation – Children\u2019s Poems',url:'https://www.poetryfoundation.org/learn/children'},
        {title:'ReadWriteThink – Reflective Writing',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'}
      ]
    },
    'age-8-science': {
      'September': [
        {title:'Steve Spangler – Dancing Raisins',url:'https://www.stevespanglerscience.com/lab/experiments/dancing-raisins-experiment/'},
        {title:'Steve Spangler – Oobleck',url:'https://www.stevespanglerscience.com/lab/experiments/oobleck/'},
        {title:'Science Buddies – Ice Cream Lab',url:'https://www.sciencebuddies.org/stem-activities/homemade-ice-cream'},
        {title:'Science Buddies – Density Tower',url:'https://www.sciencebuddies.org/stem-activities/density-tower'}
      ],
      'October': [
        {title:'NASA – Balloon Rockets',url:'https://www.jpl.nasa.gov/edu/'},
        {title:'Science Buddies – Gravity Drop',url:'https://www.sciencebuddies.org/stem-activities/gravity-drop'},
        {title:'Science Buddies – Friction Cars',url:'https://www.sciencebuddies.org/stem-activities/friction-cars'},
        {title:'TeachEngineering – Simple Machines',url:'https://www.teachengineering.org/'}
      ],
      'November': [
        {title:'Science Buddies – Magnet Exploration',url:'https://www.sciencebuddies.org/stem-activities/magnet-exploration'},
        {title:'NASA – Magnetic Fields',url:'https://spaceplace.nasa.gov/'},
        {title:'Steve Spangler – Magnetic Field Lines',url:'https://www.stevespanglerscience.com/lab/experiments/'},
        {title:'Science Buddies – Static Electricity',url:'https://www.sciencebuddies.org/stem-activities/static-electricity-experiments'}
      ],
      'December': [
        {title:'NASA – The Water Cycle',url:'https://climatekids.nasa.gov/water-cycle/'},
        {title:'NOAA – Wind & Weather',url:'https://www.weather.gov/jetstream/wind'},
        {title:'NOAA – Climate Basics',url:'https://www.climate.gov/teaching'},
        {title:'NOAA – Weather Hazards',url:'https://www.weather.gov/safety/'}
      ],
      'January': [
        {title:'NASA – Solar System Tour',url:'https://spaceplace.nasa.gov/menu/solar-system/'},
        {title:'NASA – The Sun',url:'https://spaceplace.nasa.gov/menu/sun/'},
        {title:'NASA – Moon Phases',url:'https://spaceplace.nasa.gov/menu/moon/'},
        {title:'NASA – Gravity in Space',url:'https://spaceplace.nasa.gov/what-is-gravity/en/'}
      ],
      'February': [
        {title:'NatGeo Kids – Biomes',url:'https://kids.nationalgeographic.com/science'},
        {title:'NatGeo Kids – Food Webs',url:'https://kids.nationalgeographic.com/science'},
        {title:'NOAA – Habitat Education',url:'https://www.noaa.gov/education/resource-collections/marine-life'},
        {title:'NatGeo Kids – Fossils',url:'https://kids.nationalgeographic.com/science'}
      ],
      'March': [
        {title:'NatGeo Kids – Bird Beaks',url:'https://kids.nationalgeographic.com/animals/birds/'},
        {title:'NatGeo Kids – Camouflage',url:'https://kids.nationalgeographic.com/science'},
        {title:'NatGeo Kids – Animal Insulation',url:'https://kids.nationalgeographic.com/animals/'},
        {title:'NatGeo Kids – Inherited Traits',url:'https://kids.nationalgeographic.com/science'}
      ],
      'April': [
        {title:'Science Buddies – Seed Germination',url:'https://www.sciencebuddies.org/stem-activities/seed-germination-baggie'},
        {title:'Science Buddies – Capillary Action',url:'https://www.sciencebuddies.org/stem-activities/capillary-action-flowers'},
        {title:'NatGeo Kids – Photosynthesis',url:'https://kids.nationalgeographic.com/science'},
        {title:'NatGeo Kids – Pollination',url:'https://kids.nationalgeographic.com/animals/invertebrates/facts/honeybee'}
      ],
      'May': [
        {title:'TeachEngineering – Bridge Building',url:'https://www.teachengineering.org/'},
        {title:'Science Buddies – Egg Drop Challenge',url:'https://www.sciencebuddies.org/stem-activities/egg-drop'},
        {title:'TeachEngineering – Paper Towers',url:'https://www.teachengineering.org/activities/view/cub_intro_lesson03_activity1'},
        {title:'Science Buddies – Water Filter',url:'https://www.sciencebuddies.org/stem-activities/clean-water-engineering'}
      ],
      'June': [
        {title:'Khan Academy – 3rd Grade Science',url:'https://www.khanacademy.org/science'},
        {title:'NatGeo Kids – Science Hub',url:'https://kids.nationalgeographic.com/science'},
        {title:'Science Buddies – Project Ideas',url:'https://www.sciencebuddies.org/science-fair-projects/project-ideas/list?grade_level%5B%5D=el2'},
        {title:'Science Buddies – Science Fair Guide',url:'https://www.sciencebuddies.org/science-fair-projects/science-fair'}
      ]
    },
    'age-8-art': {
      'September': [
        {title:'KinderArt – Lines & Drawing',url:'https://kinderart.com/art-lessons/drawing/'},
        {title:'Art For Kids Hub – Shape Drawing',url:'https://www.artforkidshub.com/category/how-to-draw/people/'},
        {title:'Crayola – Color Mixing',url:'https://www.crayola.com/lesson-plans/color-and-art-techniques/'},
        {title:'Tate Kids – Warm vs Cool Colors',url:'https://www.tate.org.uk/kids/make/paint-draw'}
      ],
      'October': [
        {title:'Proko – Contour Drawing for Kids',url:'https://www.proko.com/blind-contour-drawing/'},
        {title:'Drawing Coach – Shading Basics',url:'https://www.proko.com/blind-contour-drawing/'},
        {title:'Art For Kids Hub – Still Life',url:'https://www.artforkidshub.com/category/how-to-draw/people/'},
        {title:'Art For Kids Hub – Figure Drawing',url:'https://www.artforkidshub.com/category/how-to-draw/people/'}
      ],
      'November': [
        {title:'Crayola – Watercolor Wash',url:'https://www.crayola.com/crafts/'},
        {title:'KinderArt – Watercolor Texture',url:'https://kinderart.com/art-lessons/painting/'},
        {title:'KinderArt – Tempera Painting',url:'https://kinderart.com/art-lessons/painting/'},
        {title:'Tate Kids – Nature Painting',url:'https://www.tate.org.uk/kids/make/paint-draw'}
      ],
      'December': [
        {title:'KinderArt – Clay Pinch Pots',url:'https://kinderart.com/category/art-lessons/sculpture/clay/clay/'},
        {title:'KinderArt – Paper Mache',url:'https://kinderart.com/category/art-lessons/sculpture/clay/paper-mache/'},
        {title:'Origami.me – Easy Models',url:'https://origami.me/diagrams/'},
        {title:'KinderArt – Found Object Sculpture',url:'https://kinderart.com/category/art-lessons/sculpture/clay/'}
      ],
      'January': [
        {title:'Classics for Kids – Rhythm Lessons',url:'https://www.classicsforkids.com/'},
        {title:'NYP Kidzone – Tempo & Dynamics',url:'https://pbskids.org/games/music/'},
        {title:'Classics for Kids – Music Notation',url:'https://www.classicsforkids.com/'},
        {title:'PBS Kids – Music & Rhythm',url:'https://pbskids.org/games/music/'}
      ],
      'February': [
        {title:'Tate Kids – Aboriginal Dot Painting',url:'https://www.tate.org.uk/kids/artists/aboriginal-art'},
        {title:'KinderArt – Sumi-e Ink Painting',url:'https://kinderart.com/art-lessons/'},
        {title:'Smithsonian – African Textiles',url:'https://africa.si.edu/exhibits/textiles/'},
        {title:'KinderArt – Mexican Folk Art',url:'https://kinderart.com/art-lessons/'}
      ],
      'March': [
        {title:'Drama Resource – Character Voices',url:'https://dramaresource.com/'},
        {title:'Drama Resource – Improv Games',url:'https://dramaresource.com/'},
        {title:'ReadWriteThink – Reader\u2019s Theater',url:'https://www.readwritethink.org/classroom-resources/lesson-plans'},
        {title:'KinderArt – Puppet Making',url:'https://kinderart.com/art-lessons/'}
      ],
      'April': [
        {title:'KinderArt – Collage Art',url:'https://kinderart.com/art-lessons/'},
        {title:'KinderArt – Stamp Printing',url:'https://kinderart.com/art-lessons/printmaking/'},
        {title:'Tate Kids – Monoprinting',url:'https://www.tate.org.uk/kids/make'},
        {title:'KinderArt – Recycled Art',url:'https://kinderart.com/art-lessons/recycled/'}
      ],
      'May': [
        {title:'Tate Kids – Monet & Impressionism',url:'https://www.tate.org.uk/kids/artists/who-claude-monet'},
        {title:'Tate Kids – Picasso & Cubism',url:'https://www.tate.org.uk/kids/artists/who-pablo-picasso'},
        {title:'Tate Kids – Frida Kahlo',url:'https://www.tate.org.uk/kids/artists/who-frida-kahlo'},
        {title:'NMWA – Georgia O\u2019Keeffe',url:'https://nmwa.org/art/artists/georgia-okeeffe/'}
      ],
      'June': [
        {title:'KinderArt – Portfolio Tips',url:'https://kinderart.com/art-lessons/'},
        {title:'MoMA Learning – Curating',url:'https://www.moma.org/learn/'},
        {title:'KinderArt – Group Mural',url:'https://kinderart.com/art-lessons/'},
        {title:'PE Central – Field Day Activities',url:'https://www.pecentral.org/lessonideas/'}
      ]
    }
  };

  // --- Parse the current page filename to get the resource key ---
  function getPageKey() {
    var path = window.location.pathname;
    var filename = path.split('/').pop().replace('.html', '');
    return RESOURCES[filename] ? filename : null;
  }

  // --- Get the currently displayed month ---
  function getActiveMonth() {
    var tab = document.querySelector('.month-tab.active');
    return tab ? tab.textContent.trim() : null;
  }

  // --- Auth helpers (same logic as paywall.js) ---
  var FREE_MONTH = 'September';

  function isFreeUser() {
    if (typeof CuricaaAuth === 'undefined') return true;
    var user = CuricaaAuth.getUser();
    return !user || user.plan === 'free';
  }

  function hasProAccess() {
    if (typeof CuricaaAuth === 'undefined') return false;
    var user = CuricaaAuth.getUser();
    if (!user) return false;
    return user.plan === 'pro';
  }

  function isFreeMonth(name) {
    return name === FREE_MONTH;
  }

  function showPaywall() {
    var modal = document.getElementById('wsPaywallModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  // --- Inject resource links into week-detail dropdowns ---
  function injectResources() {
    var key = getPageKey();
    if (!key) return;

    var month = getActiveMonth();
    if (!month) return;

    var monthResources = RESOURCES[key][month];
    if (!monthResources) return;

    // Determine access: September free for everyone, other months require Pro
    var freeMonth = isFreeMonth(month);
    var pro = hasProAccess();
    var showLink = freeMonth || pro;

    var details = document.querySelectorAll('.week-detail');
    details.forEach(function(detail, idx) {
      // Skip if already injected
      if (detail.querySelector('.res-link')) return;
      if (idx >= monthResources.length) return;

      var r = monthResources[idx];
      var linkDiv = document.createElement('div');
      linkDiv.className = 'res-link';
      linkDiv.style.cssText = 'display:flex;gap:12px;margin-bottom:12px;margin-top:8px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);';

      if (showLink) {
        // Unlocked: show the actual resource link
        linkDiv.innerHTML =
          '<div style="width:24px;color:var(--a2);text-align:center;margin-top:2px;flex-shrink:0;"><i class="fas fa-link" style="font-size:12px;"></i></div>' +
          '<div style="flex:1;">' +
            '<strong style="font-size:12px;color:var(--ct5);text-transform:uppercase;letter-spacing:0.06em;">Free Resource</strong>' +
            '<div style="margin-top:5px;">' +
              '<a href="' + r.url + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);text-decoration:none;font-size:12px;font-weight:600;color:#93c5fd;transition:background 0.2s,border-color 0.2s;" ' +
                'onmouseover="this.style.background=\'rgba(59,130,246,0.2)\';this.style.borderColor=\'rgba(59,130,246,0.4)\'" ' +
                'onmouseout="this.style.background=\'rgba(59,130,246,0.1)\';this.style.borderColor=\'rgba(59,130,246,0.2)\'">' +
                '<i class="fas fa-external-link-alt" style="font-size:10px;"></i>' +
                r.title +
              '</a>' +
            '</div>' +
          '</div>';
      } else {
        // Locked: show paywall prompt
        linkDiv.innerHTML =
          '<div style="width:24px;color:#a78bfa;text-align:center;margin-top:2px;flex-shrink:0;"><i class="fas fa-lock" style="font-size:12px;"></i></div>' +
          '<div style="flex:1;">' +
            '<strong style="font-size:12px;color:var(--ct5);text-transform:uppercase;letter-spacing:0.06em;">Free Resource</strong>' +
            '<div style="margin-top:5px;">' +
              '<span onclick="document.getElementById(\'wsPaywallModal\').style.display=\'flex\';document.body.style.overflow=\'hidden\';" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);cursor:pointer;font-size:12px;font-weight:600;color:#a78bfa;transition:background 0.2s;" ' +
                'onmouseover="this.style.background=\'rgba(139,92,246,0.18)\'" ' +
                'onmouseout="this.style.background=\'rgba(139,92,246,0.08)\'">' +
                '<i class="fas fa-lock" style="font-size:10px;"></i>' +
                'Resource locked' +
                '<span style="font-size:10px;color:rgba(255,255,255,0.3);margin-left:4px;"><i class="fas fa-crown" style="font-size:9px;"></i> Pro</span>' +
              '</span>' +
            '</div>' +
          '</div>';
      }

      detail.querySelector('div').appendChild(linkDiv);
    });
  }

  // --- Watch for month content re-renders ---
  function watchForChanges() {
    var contentEl = document.getElementById('monthContent');
    if (!contentEl) return;

    var observer = new MutationObserver(function() {
      setTimeout(injectResources, 120);
    });
    observer.observe(contentEl, { childList: true, subtree: true });
  }

  // --- Boot (wait for auth to be ready) ---
  function boot() {
    if (!getPageKey()) return;
    watchForChanges();
    setTimeout(injectResources, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(boot, 100); });
  } else {
    setTimeout(boot, 100);
  }

})();
