/*
 * End-of-Month Quizzes -- Curicaa
 * 5 questions per subject per month, covering all weekly topics.
 * September quizzes: FREE for all subscription plans.
 * All other months: Pro-only (blurred + "Must upgrade" overlay for non-Pro).
 */
(function() {
  'use strict';

  // Detect which subject page we're on
  var path = window.location.pathname;
  var pageKey = '';
  var keys = [
    'ages-5-7-math','ages-5-7-english','ages-5-7-science','ages-5-7-art',
    'age-14-math','age-14-english','age-14-science','age-14-social-studies',
    'age-8-math','age-8-english','age-8-science','age-8-art',
    'age-9-math','age-9-english','age-9-science','age-9-art',
    'age-10-math','age-10-english','age-10-science','age-10-art',
    'ages-11-12-math','ages-11-12-english','ages-11-12-science','ages-11-12-art',
    'ages-15-16-math','ages-15-16-english','ages-15-16-science','ages-15-16-social-studies',
    'ages-17-18-math','ages-17-18-english','ages-17-18-science','ages-17-18-art','age-10-pe'
  ];
  for (var k = 0; k < keys.length; k++) {
    if (path.indexOf(keys[k]) !== -1) { pageKey = keys[k]; break; }
  }
  if (!pageKey) return;

  // ========================= QUIZ DATA =========================
  // Each subject has 10 months (Sep-Jun), each month has 5 MC questions.
  // Format: { question, options: [4 choices], correct: 0-based index }
  var QUIZ_DATA = {

    // ---------- AGES 5-7 MATH ----------
    'ages-5-7-math': {
      'September': [
        { question: 'How many blocks are in a tower labeled "5"?', options: ['3','4','5','6'], correct: 2 },
        { question: 'What number comes after 7 when counting?', options: ['6','8','9','10'], correct: 1 },
        { question: 'What does "zero" mean?', options: ['One','Many','Nothing/empty','Ten'], correct: 2 },
        { question: 'Which group has MORE: 3 apples or 8 apples?', options: ['3 apples','8 apples','They are equal','Cannot tell'], correct: 1 },
        { question: 'If you have 4 buttons and place them under the number card "4", how many buttons should be there?', options: ['3','4','5','2'], correct: 1 }
      ],
      'October': [
        { question: 'How many ones make one bundle of ten?', options: ['5','8','10','20'], correct: 2 },
        { question: 'What is 10 + 4?', options: ['14','104','10','13'], correct: 0 },
        { question: 'The number 18 is made of:', options: ['1 ten and 8 ones','8 tens and 1 one','18 tens','1 and 8'], correct: 0 },
        { question: 'What number is two tens?', options: ['12','20','10','22'], correct: 1 },
        { question: 'If there are 10 pennies under a cup and 3 more next to it, how many in all? (Count on!)', options: ['10','11','12','13'], correct: 3 }
      ],
      'November': [
        { question: 'If 2 red fish and 3 blue fish swim together, how many fish in all?', options: ['4','5','6','3'], correct: 1 },
        { question: 'What does the "+" symbol mean?', options: ['Take away','Put together / and','Same as','Less than'], correct: 1 },
        { question: '2 + 3 = ?', options: ['4','6','5','3'], correct: 2 },
        { question: 'In a number bond, the whole is 5 and one part is 2. What is the other part?', options: ['2','4','3','7'], correct: 2 },
        { question: 'What is 1 + 4?', options: ['3','6','5','4'], correct: 2 }
      ],
      'December': [
        { question: 'There are 5 cookies. You eat 2. How many are left?', options: ['2','4','3','7'], correct: 2 },
        { question: 'What does the "-" symbol mean?', options: ['Put together','Take away','Same as','More than'], correct: 1 },
        { question: '5 - 3 = ?', options: ['1','3','2','8'], correct: 2 },
        { question: 'If 3 + 2 = 5, then 5 - 2 = ?', options: ['2','4','3','1'], correct: 2 },
        { question: 'There are 4 birds. 1 flies away. How many birds are left?', options: ['2','1','3','4'], correct: 2 }
      ],
      'January': [
        { question: 'Which shape has 3 sides?', options: ['Circle','Square','Triangle','Rectangle'], correct: 2 },
        { question: 'Two triangles can be put together to make which shape?', options: ['Circle','Square or rhombus','Triangle','Pentagon'], correct: 1 },
        { question: 'Which is a 3D shape (not flat)?', options: ['Circle','Square','Triangle','Sphere (ball)'], correct: 3 },
        { question: 'If the bear is ON the box, where is the bear?', options: ['Inside the box','Under the box','On top of the box','Beside the box'], correct: 2 },
        { question: 'A can of soup is shaped like which 3D shape?', options: ['Sphere','Cube','Cylinder','Cone'], correct: 2 }
      ],
      'February': [
        { question: 'If a book is 6 blocks long and a pencil is 4 blocks long, which is longer?', options: ['The pencil','The book','They are the same','Cannot tell'], correct: 1 },
        { question: 'On a balance scale, which side goes DOWN?', options: ['The lighter side','The heavier side','Both sides','Neither side'], correct: 1 },
        { question: 'A tall thin glass and a short wide bowl -- which holds more?', options: ['The tall glass always holds more','The short bowl always holds more','You have to test by pouring','They always hold the same'], correct: 2 },
        { question: 'If you sort blocks by color and have 5 red, 3 blue, and 7 green, which color has the MOST?', options: ['Red','Blue','Green','They are equal'], correct: 2 },
        { question: 'What tool could you use to measure how long your foot is?', options: ['A balance scale','Paperclips or blocks','A clock','A thermometer'], correct: 1 }
      ],
      'March': [
        { question: 'On a hundreds chart, what number is directly below 25?', options: ['24','26','15','35'], correct: 3 },
        { question: 'Count by 10s: 10, 20, 30, ___. What comes next?', options: ['31','40','50','33'], correct: 1 },
        { question: 'Skip count by 5s: 5, 10, 15, ___. What comes next?', options: ['16','25','20','30'], correct: 2 },
        { question: 'Which is greater: 42 or 34?', options: ['34','42','They are equal','Cannot tell'], correct: 1 },
        { question: 'How many groups of 10 make 100?', options: ['5','8','10','100'], correct: 2 }
      ],
      'April': [
        { question: 'What number goes with 3 to make 10?', options: ['6','8','7','5'], correct: 2 },
        { question: 'To solve 2 + 7 quickly, you should:', options: ['Count from 1 each time','Start at 7 and count on 2 more','Start at 2 and count backward','Guess'], correct: 1 },
        { question: 'For 9 - 7, which is faster: counting back from 9 or counting up from 7?', options: ['Counting back from 9','Counting up from 7','Both are the same','Neither works'], correct: 1 },
        { question: 'There are 6 ducks. 2 swim away. How many are left?', options: ['4','3','8','2'], correct: 0 },
        { question: 'If you have 4 stickers and get 5 more, what equation matches the story?', options: ['5 - 4 = 1','4 + 5 = 9','4 + 5 = 10','5 × 4 = 20'], correct: 1 }
      ],
      'May': [
        { question: '10 ones can be traded for:', options: ['1 hundred','1 ten rod','10 tens','Nothing'], correct: 1 },
        { question: 'The number 16 is made of:', options: ['6 tens and 1 one','1 ten and 6 ones','16 tens','1 and 6'], correct: 1 },
        { question: 'What is 34 + 10?', options: ['35','44','34','24'], correct: 1 },
        { question: '23 + 4 = ?', options: ['27','64','19','28'], correct: 0 },
        { question: 'In the number 42, what does the 4 represent?', options: ['4 ones','4 tens','40 ones','Both B and C'], correct: 3 }
      ],
      'June': [
        { question: 'Which coin is worth 10 cents?', options: ['Penny','Nickel','Dime','Quarter'], correct: 2 },
        { question: 'When the short hand points to 3 on a clock, what time is it?', options: ['12:00','3:00','6:00','9:00'], correct: 1 },
        { question: 'A cereal box is shaped like a:', options: ['Sphere','Cylinder','Rectangular prism','Cone'], correct: 2 },
        { question: 'If 3 + 2 = 5, then 5 - 3 = ?', options: ['1','3','2','8'], correct: 2 },
        { question: 'What did you learn this year that you are most proud of? (Open answer -- any response counts!)', options: ['Counting and numbers','Addition and subtraction','Shapes and measurement','All of the above!'], correct: 3 }
      ]
    },

    // ---------- AGES 5-7 ENGLISH ----------
    'ages-5-7-english': {
      'September': [
        { question: 'What sound does the letter "M" make?', options: ['/ah/','/m/','/s/','/t/'], correct: 1 },
        { question: 'Which letter comes AFTER "G" in the alphabet?', options: ['F','E','H','I'], correct: 2 },
        { question: 'How many syllables does the word "cat" have?', options: ['1','2','3','4'], correct: 0 },
        { question: 'Which word rhymes with "bat"?', options: ['dog','hat','cup','sun'], correct: 1 },
        { question: 'What is the first letter of the alphabet?', options: ['B','C','A','Z'], correct: 2 }
      ],
      'October': [
        { question: 'What two letters make the /sh/ sound?', options: ['c and h','s and h','t and h','p and h'], correct: 1 },
        { question: 'Which word begins with a consonant digraph?', options: ['apple','ship','orange','umbrella'], correct: 1 },
        { question: 'What sound do the letters "ch" make?', options: ['/sh/','/ch/','/th/','/ph/'], correct: 1 },
        { question: 'Which word has the /th/ sound at the beginning?', options: ['ship','chip','this','phone'], correct: 2 },
        { question: 'In the word "shop", the "sh" makes:', options: ['Two separate sounds /s/ /h/','One sound /sh/','The /ch/ sound','No sound'], correct: 1 }
      ],
      'November': [
        { question: 'Which word is a CVC (consonant-vowel-consonant) word?', options: ['tree','cat','ship','boat'], correct: 1 },
        { question: 'To read the word "pig", you should:', options: ['Guess from the picture','Sound out each letter: /p/ /i/ /g/','Skip it','Memorize the whole word'], correct: 1 },
        { question: 'What is the middle sound in "dog"?', options: ['/a/','/e/','/o/','/u/'], correct: 2 },
        { question: 'Which word family does "hat" belong to?', options: ['-at family','-it family','-ot family','-ut family'], correct: 0 },
        { question: 'If you change the first letter of "pin" to "t", what word do you get?', options: ['pan','tin','ten','ton'], correct: 1 }
      ],
      'December': [
        { question: 'Which is a "sight word" that cannot be easily sounded out?', options: ['cat','the','pig','dog'], correct: 1 },
        { question: 'How many Dolch sight words are in the sentence: "The cat sat on the mat"?', options: ['1','2','3','4'], correct: 2 },
        { question: 'Read this sentence: "She can run." Who is running?', options: ['A boy','She (a girl)','An animal','We don\'t know'], correct: 1 },
        { question: 'What type of word is "the"?', options: ['Action word','Naming word','Sight word / article','Describing word'], correct: 2 },
        { question: 'Which word needs to be memorized because it doesn\'t follow normal phonics rules?', options: ['sun','said','map','lip'], correct: 1 }
      ],
      'January': [
        { question: 'What sound does the "magic E" make at the end of "make"?', options: ['No sound -- it makes the A say its name','It says /e/','It says /m/','It is silent and does nothing'], correct: 0 },
        { question: 'Which word has a long A sound?', options: ['cat','mat','cake','hat'], correct: 2 },
        { question: 'Add "magic E" to "pin". What word do you get?', options: ['pine','pane','pone','pune'], correct: 0 },
        { question: 'Which word has a long O sound?', options: ['hot','hop','hope','pot'], correct: 2 },
        { question: 'In the word "kite", the E at the end:', options: ['Is silent and does nothing','Makes the I say its name (long I)','Makes a /t/ sound','Makes the word plural'], correct: 1 }
      ],
      'February': [
        { question: 'Which two vowels work together to make the long A sound in "rain"?', options: ['a and e','a and i','e and i','o and u'], correct: 1 },
        { question: 'Which word contains the "ee" vowel team?', options: ['rain','feet','boat','look'], correct: 1 },
        { question: 'What sound does "oa" make in "boat"?', options: ['Short o','Long o','Short a','Long a'], correct: 1 },
        { question: 'Which word has the "igh" vowel team making a long I sound?', options: ['night','neat','note','nut'], correct: 0 },
        { question: 'In the word "tree", the "ee" makes which sound?', options: ['Short e','Long e','Short i','Long a'], correct: 1 }
      ],
      'March': [
        { question: 'What does a period (.) at the end of a sentence mean?', options: ['Ask a question','Show excitement','The sentence is over / a full stop','Take a breath'], correct: 2 },
        { question: 'What does a question mark (?) mean?', options: ['The sentence is over','Someone is excited','Someone is asking something','Someone is angry'], correct: 2 },
        { question: 'Every sentence should start with a:', options: ['Small letter','Capital letter','Number','Period'], correct: 1 },
        { question: 'Which is a complete sentence?', options: ['the big dog','ran fast','The big dog ran fast.','dog big the'], correct: 2 },
        { question: 'What punctuation shows strong feeling or excitement?', options: ['Period (.)','Comma (,)','Question mark (?)','Exclamation mark (!)'], correct: 3 }
      ],
      'April': [
        { question: 'A noun is a word that names a:', options: ['Action','Person, place, or thing','Feeling','Color'], correct: 1 },
        { question: 'Which word is a noun?', options: ['run','happy','dog','quickly'], correct: 2 },
        { question: 'A verb is a word that shows:', options: ['A name','An action or doing','A color','A place'], correct: 1 },
        { question: 'Which word is a verb (action word)?', options: ['table','jump','beautiful','school'], correct: 1 },
        { question: '"The cat SLEEPS on the mat." Which word is the verb?', options: ['the','cat','sleeps','mat'], correct: 2 }
      ],
      'May': [
        { question: 'When writing a story, what should come first?', options: ['The ending','The middle','The beginning (introduction)','The title page'], correct: 2 },
        { question: 'What does "sequence" mean in a story?', options: ['The characters\' names','The order events happen','The title','The moral'], correct: 1 },
        { question: 'Words like "first," "next," "then," and "finally" are called:', options: ['Nouns','Verbs','Transition/sequence words','Adjectives'], correct: 2 },
        { question: 'In a story about a trip, what would you write LAST?', options: ['Packing the bags','Getting home','Arriving at the place','Waking up that day'], correct: 1 },
        { question: 'A good story ending should:', options: ['Start a new topic','Feel complete and wrap up the story','End in the middle of a sentence','Be very long'], correct: 1 }
      ],
      'June': [
        { question: 'What is reading fluency?', options: ['Reading very slowly','Reading smoothly with expression at a good pace','Skipping hard words','Reading only easy words'], correct: 1 },
        { question: 'When you read with expression, you should:', options: ['Use a robot voice','Read in a flat monotone','Change your voice to match the feelings in the text','Whisper everything'], correct: 2 },
        { question: 'If you don\'t know a word, a good strategy is to:', options: ['Skip it forever','Give up reading','Sound it out or look at the picture for clues','Close the book'], correct: 2 },
        { question: 'What should you do when you see a period in a sentence you\'re reading aloud?', options: ['Speed up','Take a brief pause','Shout the next word','Read backwards'], correct: 1 },
        { question: 'What did you enjoy reading most this year?', options: ['Storybooks','Poetry','Non-fiction / information books','All of the above!'], correct: 3 }
      ]
    },

    // ---------- AGES 5-7 SCIENCE ----------
    'ages-5-7-science': {
      'September': [
        { question: 'What do plants need to grow?', options: ['Just water','Sunlight, water, air, and soil','Only sunlight','Only soil'], correct: 1 },
        { question: 'Which part of a plant absorbs water from the soil?', options: ['Leaves','Flowers','Roots','Stem'], correct: 2 },
        { question: 'What is photosynthesis?', options: ['How plants breathe','How plants make food using sunlight','How plants drink water','How plants grow roots'], correct: 1 },
        { question: 'Leaves are usually green because they contain:', options: ['Water','Chlorophyll','Soil','Sugar'], correct: 1 },
        { question: 'What happens to a plant if it gets no water?', options: ['It grows faster','Nothing changes','It wilts and may die','It turns blue'], correct: 2 }
      ],
      'October': [
        { question: 'Mammals are animals that have:', options: ['Feathers','Scales','Hair or fur','Shells'], correct: 2 },
        { question: 'Which animal is an amphibian?', options: ['Eagle','Frog','Bear','Snake'], correct: 1 },
        { question: 'What is metamorphosis?', options: ['An animal sleeping through winter','A big change in an animal\'s body form as it grows','An animal finding food','An animal migrating'], correct: 1 },
        { question: 'Fish breathe underwater using:', options: ['Lungs','Gills','Noses','Blowholes'], correct: 1 },
        { question: 'Which animal group has feathers and lays eggs?', options: ['Mammals','Reptiles','Birds','Fish'], correct: 2 }
      ],
      'November': [
        { question: 'What are the four seasons in order?', options: ['Summer, winter, fall, spring','Spring, summer, fall, winter','Winter, summer, spring, fall','Fall, winter, summer, spring'], correct: 1 },
        { question: 'What causes the seasons to change?', options: ['The moon','The Earth\'s tilt as it orbits the sun','Clouds','The ocean'], correct: 1 },
        { question: 'In which season do leaves change color and fall off trees?', options: ['Spring','Summer','Fall / Autumn','Winter'], correct: 2 },
        { question: 'What kind of weather involves thunder and lightning?', options: ['Sunny day','Snowstorm','Thunderstorm','Fog'], correct: 2 },
        { question: 'A tool that measures temperature is called a:', options: ['Barometer','Thermometer','Rain gauge','Compass'], correct: 1 }
      ],
      'December': [
        { question: 'What is a shadow?', options: ['A reflection in water','A dark area where light is blocked by an object','A type of cloud','A drawing on the ground'], correct: 1 },
        { question: 'When your shadow is longest (tallest)?', options: ['Noon','Morning or late afternoon','Midnight','It never changes'], correct: 1 },
        { question: 'Which of the following is a source of light?', options: ['A rock','A mirror','The sun','A wall'], correct: 2 },
        { question: 'What happens when light hits a mirror?', options: ['It disappears','It is absorbed','It bounces back (reflects)','It turns into sound'], correct: 2 },
        { question: 'You can see objects because:', options: ['Your eyes make light','Light bounces off objects and enters your eyes','Objects are all the same color','Sound waves hit your eyes'], correct: 1 }
      ],
      'January': [
        { question: 'A push or a pull is called a:', options: ['Speed','Force','Weight','Distance'], correct: 1 },
        { question: 'Which is an example of gravity?', options: ['A ball rolling on a flat table','A book falling to the ground','A car parked on a hill','Water freezing'], correct: 1 },
        { question: 'Friction is a force that:', options: ['Speeds things up','Makes things float','Slows down or stops moving objects','Makes things glow'], correct: 2 },
        { question: 'Why does a ball eventually stop rolling on the ground?', options: ['It runs out of air','Friction slows it down','Gravity pushes it up','It melts'], correct: 1 },
        { question: 'If you push a toy car harder, what happens?', options: ['It goes slower','It goes the same speed','It goes faster','It stops immediately'], correct: 2 }
      ],
      'February': [
        { question: 'What is the largest organ in the human body?', options: ['Heart','Brain','Skin','Lungs'], correct: 2 },
        { question: 'What does the heart do?', options: ['Thinks','Pumps blood through the body','Helps you breathe','Digests food'], correct: 1 },
        { question: 'What are the tiny building blocks of all living things called?', options: ['Atoms','Cells','Molecules','Organs'], correct: 1 },
        { question: 'Which sense do you use your nose for?', options: ['Sight','Hearing','Smell','Touch'], correct: 2 },
        { question: 'Lungs help your body by:', options: ['Pumping blood','Digesting food','Taking in oxygen and removing carbon dioxide','Thinking'], correct: 2 }
      ],
      'March': [
        { question: 'What planet do we live on?', options: ['Mars','Venus','Earth','Jupiter'], correct: 2 },
        { question: 'How many planets are in our solar system?', options: ['7','8','9','10'], correct: 1 },
        { question: 'What is the sun?', options: ['A planet','A star','A moon','A comet'], correct: 1 },
        { question: 'Why does the moon seem to change shape?', options: ['It actually changes shape','It is because of how sunlight hits it as it orbits Earth','Clouds cover parts of it','It grows and shrinks'], correct: 1 },
        { question: 'Day and night happen because:', options: ['The sun goes around Earth','Earth rotates (spins) on its axis','The moon blocks the sun','Clouds move around'], correct: 1 }
      ],
      'April': [
        { question: 'What is a life cycle?', options: ['How long an animal lives','The series of changes a living thing goes through from birth to adult','How animals find food','A type of habitat'], correct: 1 },
        { question: 'What is the first stage of a butterfly\'s life cycle?', options: ['Caterpillar','Butterfly','Egg','Pupa / chrysalis'], correct: 2 },
        { question: 'A frog starts life as a:', options: ['Small frog','Tadpole','Egg in a nest','Butterfly'], correct: 1 },
        { question: 'What is metamorphosis?', options: ['An animal sleeping through winter','A major body change from young to adult form','An animal finding a mate','An animal migrating'], correct: 1 },
        { question: 'Which animal goes through metamorphosis?', options: ['Dog','Cat','Butterfly','Goldfish'], correct: 2 }
      ],
      'May': [
        { question: 'Water can exist as:', options: ['Only liquid','Only solid','Solid, liquid, and gas','Only gas'], correct: 2 },
        { question: 'What happens when water gets very cold (below 0 degreesC / 32 degreesF)?', options: ['It boils','It evaporates','It freezes into ice','Nothing happens'], correct: 2 },
        { question: 'The water cycle is:', options: ['Water going down the drain','How water moves from ground to sky and back again','Drinking water and peeing','Water in a swimming pool'], correct: 1 },
        { question: 'What is evaporation?', options: ['Water turning to ice','Water vapor turning to liquid','Liquid water turning into gas (vapor)','Rain falling from clouds'], correct: 2 },
        { question: 'What is rain an example of?', options: ['Evaporation','Condensation','Precipitation','Melting'], correct: 2 }
      ],
      'June': [
        { question: 'What does "reduce" mean in "Reduce, Reuse, Recycle"?', options: ['Make more things','Use less of something','Throw things away','Buy more plastic'], correct: 1 },
        { question: 'Which of these is recyclable?', options: ['Banana peel','Paper','Used tissue','Broken toy'], correct: 1 },
        { question: 'Why is it important to protect nature?', options: ['It looks pretty','Animals and plants need healthy habitats to survive','It\'s the law','It\'s not important'], correct: 1 },
        { question: 'What is pollution?', options: ['Clean air','Harmful substances in the environment','Planting trees','Recycling'], correct: 1 },
        { question: 'What can YOU do to help the environment?', options: ['Litter more','Leave lights on all day','Pick up trash and recycle','Waste water'], correct: 2 }
      ]
    },

    // ---------- AGES 5-7 ART ----------
    'ages-5-7-art': {
      'September': [
        { question: 'What are the three primary colors?', options: ['Red, blue, yellow','Green, orange, purple','Red, green, blue','Pink, brown, black'], correct: 0 },
        { question: 'What do you get when you mix red and yellow?', options: ['Purple','Green','Orange','Brown'], correct: 2 },
        { question: 'Colors that are next to each other on the color wheel are called:', options: ['Complementary colors','Analogous colors','Primary colors','Neutral colors'], correct: 1 },
        { question: 'What do you get when you mix blue and yellow?', options: ['Purple','Orange','Red','Green'], correct: 3 },
        { question: 'Black, white, and gray are called:', options: ['Warm colors','Cool colors','Neutral colors','Primary colors'], correct: 2 }
      ],
      'October': [
        { question: 'What is a "texture" in art?', options: ['A color','How something feels or looks like it feels','A shape','A line'], correct: 1 },
        { question: 'Nature art uses materials from:', options: ['A store','The outdoors (leaves, rocks, flowers)','A computer','A factory'], correct: 1 },
        { question: 'An artist who paints outdoors is called a:', options: ['Plein air painter','Sculptor','Photographer','Architect'], correct: 0 },
        { question: 'Which of these is a natural material you could use in art?', options: ['Plastic bottle','Markers','Fallen leaves','Glitter'], correct: 2 },
        { question: 'What can you create by rubbing a crayon over paper placed on a tree bark?', options: ['A painting','A bark texture rubbing','A sculpture','A photo'], correct: 1 }
      ],
      'November': [
        { question: 'A line in art is:', options: ['A color','A dot that moves -- a mark with length','A shape','A texture'], correct: 1 },
        { question: 'Which type of line is straight and goes from left to right?', options: ['Vertical line','Diagonal line','Horizontal line','Zigzag line'], correct: 2 },
        { question: 'What can you draw lines with?', options: ['Only pencils','Crayons, markers, chalk, paint brushes, and more','Only computers','Only pens'], correct: 1 },
        { question: 'A contour drawing is:', options: ['A drawing filled with colors','An outline drawing of the edges of a shape','A painting','A photograph'], correct: 1 },
        { question: 'Lines can show movement by being:', options: ['Straight and stiff','Curved, wavy, or zigzag','Invisible','Only horizontal'], correct: 1 }
      ],
      'December': [
        { question: 'Who was Claude Monet?', options: ['A scientist','A famous Impressionist painter','A musician','A writer'], correct: 1 },
        { question: 'What is Impressionism?', options: ['Drawing with perfect detail','An art style that captures light and mood with visible brushstrokes','Sculpting with clay','Digital art'], correct: 1 },
        { question: 'Monet is famous for painting:', options: ['Portraits of kings','Water lilies and gardens','Spaceships','Buildings'], correct: 1 },
        { question: 'What did Monet often paint outdoors to capture?', options: ['Indoor furniture','The changing light at different times of day','Portraits','Abstract shapes'], correct: 1 },
        { question: 'Impressionist painters often used:', options: ['Only black paint','Quick, loose brushstrokes','Perfectly smooth surfaces','Computers'], correct: 1 }
      ],
      'January': [
        { question: 'What is form in art?', options: ['A 2D shape','A 3D shape that has height, width, and depth','A color','A line'], correct: 1 },
        { question: 'Which of these is a way to create sculpture?', options: ['Drawing on paper','Carving, modeling, or assembling materials','Painting on canvas','Taking a photo'], correct: 1 },
        { question: 'Clay is a material used for:', options: ['Drawing','Modeling/sculpting','Photography','Dancing'], correct: 1 },
        { question: 'What is the difference between a shape and a form?', options: ['They are the same thing','A shape is flat (2D), a form has depth (3D)','A form is flat, a shape is 3D','There is no difference'], correct: 1 },
        { question: 'Which household item could you use to make a sculpture?', options: ['Paper and pencil','Recycled boxes, bottles, and tubes','A camera','A computer'], correct: 1 }
      ],
      'February': [
        { question: 'Who was Henri Matisse?', options: ['A scientist','A famous artist known for bold colors and paper cut-outs','A musician','An astronaut'], correct: 1 },
        { question: 'What is "painting with scissors"?', options: ['Cutting canvas','Matisse\'s technique of cutting shapes from colored paper','Using scissors instead of a brush','A type of dance'], correct: 1 },
        { question: 'Matisse used which colors in his artwork?', options: ['Only black and white','Bold, bright colors','Only gray','Only blue'], correct: 1 },
        { question: 'What are organic shapes?', options: ['Perfect circles and squares','Shapes found in nature -- free-flowing and curved','Shapes made with a ruler','Shapes with straight edges only'], correct: 1 },
        { question: 'A collage is:', options: ['A painting','Art made by gluing different materials together','A drawing','A sculpture'], correct: 1 }
      ],
      'March': [
        { question: 'What is rhythm in music?', options: ['The words of a song','A pattern of sounds and silences in time','The volume','The instrument'], correct: 1 },
        { question: 'A steady beat is:', options: ['A loud noise','A regular, repeating pulse (like a heartbeat)','A type of instrument','A song title'], correct: 1 },
        { question: 'Which body part can you use to keep a beat?', options: ['Only your hands','Hands, feet, head -- your whole body!','Only your ears','Only your voice'], correct: 1 },
        { question: 'In music, "tempo" means:', options: ['How loud or quiet','How fast or slow','What instruments play','The words'], correct: 1 },
        { question: 'Which of these is a way to make music?', options: ['Singing','Clapping','Playing an instrument','All of the above!'], correct: 3 }
      ],
      'April': [
        { question: 'What is printmaking?', options: ['Drawing with a pencil','Creating art by pressing inked designs onto paper','Painting with a brush','Taking photos'], correct: 1 },
        { question: 'A stencil is:', options: ['A type of paint','A template with cut-out shapes to trace or print through','A brush','A camera'], correct: 1 },
        { question: 'A stamp in printmaking is:', options: ['A piece of mail','A raised surface that holds ink to create a repeated design','A type of paper','A color'], correct: 1 },
        { question: 'Printmaking allows you to:', options: ['Make only one copy','Create multiple copies of the same design','Only draw','Only paint'], correct: 1 },
        { question: 'What everyday object can be used for printmaking?', options: ['A pencil','A sponge or potato cut into a shape','A ruler','An eraser'], correct: 1 }
      ],
      'May': [
        { question: 'Who was Wassily Kandinsky?', options: ['A scientist','An artist who created abstract art using shapes and colors','A musician','A writer'], correct: 1 },
        { question: 'Abstract art is:', options: ['Art that looks exactly like real life','Art that uses shapes, colors, and lines without trying to look realistic','Photography','Only black and white drawings'], correct: 1 },
        { question: 'Kandinsky believed colors could make you feel:', options: ['Nothing','Emotions and even hear music','Only sadness','Only happiness'], correct: 1 },
        { question: 'Which shape did Kandinsky use a lot in his paintings?', options: ['Only triangles','Only squares','Circles','Only lines'], correct: 2 },
        { question: 'Synesthesia is when:', options: ['You can\'t see colors','One sense triggers another (like seeing colors when hearing music)','You only see black and white','You hear very well'], correct: 1 }
      ],
      'June': [
        { question: 'A photograph is made using:', options: ['Paint and brush','A camera that captures light','Clay','Pencil and paper'], correct: 1 },
        { question: 'Framing a photo means:', options: ['Putting it in a physical frame only','Deciding what to include in the picture and what to leave out','Taking many photos','Editing on a computer'], correct: 1 },
        { question: 'What makes a good photograph?', options: ['Only expensive cameras','Interesting subject, good lighting, and thoughtful composition','Only people','Only nature'], correct: 1 },
        { question: 'What is perspective in photography?', options: ['The type of camera','The angle or viewpoint from which you take the photo','The color of the photo','How big the photo is'], correct: 1 },
        { question: 'What was your favorite art project this year?', options: ['Color mixing','Sculpture','Printmaking','All of them!'], correct: 3 }
      ]
    },

    // ---------- AGE 14 MATH (Algebra I) ----------
    'age-14-math': {
      'September': [
        { question: 'Which of these is a variable?', options: ['5','+','x','3.14'], correct: 2 },
        { question: 'Evaluate 3x + 2 when x = 4.', options: ['14','9','12','20'], correct: 0 },
        { question: 'An algebraic expression is:', options: ['A sentence with an equals sign','A math phrase with numbers, variables, and operations','A type of graph','A fraction'], correct: 1 },
        { question: 'What does "evaluate" mean in math?', options: ['Solve for x','Find the numerical value of an expression by substituting','Draw a graph','Simplify a fraction'], correct: 1 },
        { question: 'Simplify: 2x + 3x', options: ['6x','5x','x','23x'], correct: 1 }
      ],
      'October': [
        { question: 'Solve: x + 7 = 15', options: ['x = 22','x = 7','x = 8','x = 2'], correct: 2 },
        { question: 'To solve 2x = 10, you should:', options: ['Add 2 to both sides','Divide both sides by 2','Multiply both sides by 2','Subtract 2 from both sides'], correct: 1 },
        { question: 'Solve: 3x - 5 = 16', options: ['x = 7','x = 11','x = 21','x = 3'], correct: 0 },
        { question: 'What does "isolate the variable" mean?', options: ['Remove the variable entirely','Get the variable alone on one side of the equation','Make the variable equal to 0','Put the variable on the right side'], correct: 1 },
        { question: 'Solve: x/4 = 5', options: ['x = 1','x = 9','x = 20','x = 1.25'], correct: 2 }
      ],
      'November': [
        { question: 'Which of these is a function?', options: ['{(1,2), (1,3), (2,4)}','{(1,2), (2,4), (3,6)}','{(1,2), (2,2), (1,3)}','{(0,0)}'], correct: 1 },
        { question: 'In a function, each input has:', options: ['Multiple outputs','Exactly one output','No output','Random outputs'], correct: 1 },
        { question: 'What is the domain of a function?', options: ['The output values','The input values','The graph','The equation'], correct: 1 },
        { question: 'f(x) = 3x + 1. Find f(2).', options: ['5','7','6','3'], correct: 1 },
        { question: 'The range of a function is:', options: ['The input values','The output values','The x-values','The domain'], correct: 1 }
      ],
      'December': [
        { question: 'In the equation y = mx + b, what does "m" represent?', options: ['The y-intercept','The slope','The x-intercept','The domain'], correct: 1 },
        { question: 'What is the slope of the line y = 3x + 5?', options: ['5','3','8','15'], correct: 1 },
        { question: 'The y-intercept is where the line crosses:', options: ['The x-axis','The y-axis','The origin','Both axes'], correct: 1 },
        { question: 'What does a positive slope look like on a graph?', options: ['Line going down left to right','Line going up left to right','Horizontal line','Vertical line'], correct: 1 },
        { question: 'In y = -2x + 4, the y-intercept is:', options: ['-2','2','4','-4'], correct: 2 }
      ],
      'January': [
        { question: 'Solve the system: x + y = 10 and x - y = 4', options: ['x = 5, y = 5','x = 7, y = 3','x = 8, y = 2','x = 6, y = 4'], correct: 1 },
        { question: 'The solution to a system of equations is:', options: ['Any point on the graph','The point where both lines intersect','The y-intercepts','The slopes'], correct: 1 },
        { question: 'Using substitution: If y = 3x and 2x + y = 20, what is x?', options: ['x = 4','x = 5','x = 6','x = 10'], correct: 0 },
        { question: 'If a system has no solution, the lines are:', options: ['Intersecting','Parallel','The same line','Perpendicular'], correct: 1 },
        { question: 'If a system has infinitely many solutions, the lines are:', options: ['Parallel','Perpendicular','The same line','Intersecting'], correct: 2 }
      ],
      'February': [
        { question: 'What are the domain restrictions for the inequality x + 3 > 7?', options: ['x > 4','x < 4','x > 10','x = 4'], correct: 0 },
        { question: 'Solve: 2x - 3 < 9', options: ['x < 3','x < 6','x > 6','x > 3'], correct: 1 },
        { question: 'When graphing x >= 2, you use:', options: ['An open circle at 2 and shade right','A closed circle at 2 and shade right','A closed circle at 2 and shade left','An open circle at 2 and shade left'], correct: 1 },
        { question: 'When you multiply or divide both sides of an inequality by a negative number, you must:', options: ['Do nothing','Flip the inequality sign','Make it an equation','Add the numbers'], correct: 1 },
        { question: 'Solve: -x > 5', options: ['x > 5','x < -5','x > -5','x < 5'], correct: 1 }
      ],
      'March': [
        { question: 'Simplify: x^3 * x^4', options: ['x^7','x^1^2','x','x^3^4'], correct: 0 },
        { question: 'What is (x^2)^3?', options: ['x^5','x^6','x^8','x'], correct: 1 },
        { question: 'Simplify: x^5 / x^2', options: ['x^3','x^7','x^1^0','x^2*^5'], correct: 0 },
        { question: 'What is any nonzero number raised to the 0 power?', options: ['0','1','The number itself','Undefined'], correct: 1 },
        { question: 'Write 0.0045 in scientific notation.', options: ['4.5 × 10^3','4.5 × 10^-^3','45 × 10^-^4','0.45 × 10^-^2'], correct: 1 }
      ],
      'April': [
        { question: 'What is the degree of the polynomial 3x^2 + 5x - 1?', options: ['1','2','3','5'], correct: 1 },
        { question: 'Add: (2x^2 + 3x) + (x^2 - 5x)', options: ['3x^2 - 2x','x^2 + 8x','3x^2 + 8x','x^2 - 2x'], correct: 0 },
        { question: 'Multiply: x(x + 4)', options: ['x + 4','x^2 + 4','x^2 + 4x','2x + 4'], correct: 2 },
        { question: 'What is the GCF of 6x^2 and 9x?', options: ['3x','18x^2','3x^2','6x'], correct: 0 },
        { question: 'Factor: x^2 + 5x + 6', options: ['(x + 2)(x + 3)','(x + 1)(x + 6)','(x + 3)(x + 3)','(x - 2)(x - 3)'], correct: 0 }
      ],
      'May': [
        { question: 'The quadratic formula is:', options: ['x = -b/(2a)','x = (-b ± sqrt((b^2-4ac)) / 2a','x = a^2 + b','x = 2a/b'], correct: 1 },
        { question: 'For y = x^2, the graph is a:', options: ['Straight line','Parabola','Circle','V-shape'], correct: 1 },
        { question: 'In y = ax^2 + bx + c, if a > 0 the parabola opens:', options: ['Downward','Upward','Sideways','Flat'], correct: 1 },
        { question: 'The discriminant (b^2 - 4ac) tells you:', options: ['The y-intercept','How many solutions/roots there are','The slope','The vertex'], correct: 1 },
        { question: 'If the discriminant is negative, the quadratic has:', options: ['Two real solutions','One real solution','No real solutions','Three solutions'], correct: 2 }
      ],
      'June': [
        { question: 'The Pythagorean theorem states: a^2 + b^2 =', options: ['ab','c^2','2ab','a + b'], correct: 1 },
        { question: 'If a = 3 and b = 4, what is c (the hypotenuse)?', options: ['5','7','12','25'], correct: 0 },
        { question: 'A right triangle has one angle that is:', options: ['60 degrees','45 degrees','90 degrees','180 degrees'], correct: 2 },
        { question: 'If the hypotenuse is 13 and one leg is 5, the other leg is:', options: ['8','12','18','144'], correct: 1 },
        { question: 'What did you find most challenging this year in Algebra?', options: ['Solving equations','Graphing','Word problems','All were great learning!'], correct: 3 }
      ]
    },

    // ---------- AGE 14 ENGLISH ----------
    'age-14-english': {
      'September': [
        { question: 'The protagonist of a story is the:', options: ['Villain','Main character','Setting','Narrator'], correct: 1 },
        { question: 'What is the "setting" of a story?', options: ['The plot','The time and place where the story happens','The main character','The theme'], correct: 1 },
        { question: 'A theme is:', options: ['The title of the book','The central message or lesson of a story','The setting','A character name'], correct: 1 },
        { question: 'The antagonist is:', options: ['The hero','The character or force that opposes the protagonist','The narrator','The setting'], correct: 1 },
        { question: 'What is the "plot" of a story?', options: ['The characters','The sequence of events','The setting','The genre'], correct: 1 }
      ],
      'October': [
        { question: 'An inference is:', options: ['A direct quote from the text','A conclusion drawn from evidence and reasoning','A summary','An opinion'], correct: 1 },
        { question: 'When you "cite textual evidence," you:', options: ['Make up a quote','Quote or reference specific parts of the text to support your answer','Give your opinion','Summarize the whole book'], correct: 1 },
        { question: 'Which is an example of inferring?', options: ['"The text says she smiled."','"She smiled, so she was probably happy even though she didn\'t say it."','"The story is 10 pages long."','"There are 5 characters."'], correct: 1 },
        { question: 'What does "implicit" mean?', options: ['Stated directly','Implied but not directly stated','Unimportant','Written in bold'], correct: 1 },
        { question: 'Good readers use context clues to:', options: ['Skip hard words','Figure out the meaning of unknown words','Ignore the author\'s message','Read faster'], correct: 1 }
      ],
      'November': [
        { question: 'A thesis statement is:', options: ['A fact','A clear, arguable claim that states the main idea of an essay','A question','A quote'], correct: 1 },
        { question: 'A body paragraph should include:', options: ['Only quotes','A topic sentence, evidence, analysis, and a concluding sentence','Only the thesis','Random facts'], correct: 1 },
        { question: 'What does "analysis" mean in writing?', options: ['Summarizing','Explaining HOW and WHY evidence supports your claim','Copying quotes','Giving your opinion without evidence'], correct: 1 },
        { question: 'An essay introduction should include:', options: ['Only the thesis','A hook, background info, and thesis statement','The conclusion','Random facts'], correct: 1 },
        { question: 'What should a conclusion do?', options: ['Introduce new evidence','Restate the thesis and leave the reader with a final thought','Repeat the introduction word for word','End abruptly'], correct: 1 }
      ],
      'December': [
        { question: 'What is a metaphor?', options: ['A comparison using "like" or "as"','A direct comparison saying one thing IS another','A type of poem','An exaggeration'], correct: 1 },
        { question: '"The wind whispered through the trees" is an example of:', options: ['Simile','Personification','Hyperbole','Alliteration'], correct: 1 },
        { question: 'A simile uses which words to compare?', options: ['Is and are','Like or as','Was and were','Has and have'], correct: 1 },
        { question: '"I\'m so hungry I could eat a horse" is an example of:', options: ['Metaphor','Simile','Hyperbole (exaggeration)','Personification'], correct: 2 },
        { question: 'Imagery is language that appeals to the:', options: ['Mind only','Five senses (sight, sound, touch, taste, smell)','Emotions','Logic'], correct: 1 }
      ],
      'January': [
        { question: 'What is a comma splice?', options: ['Using too many commas','Joining two complete sentences with only a comma','Using a comma in a list','Placing a comma after "and"'], correct: 1 },
        { question: 'Which sentence is correct?', options: ['He ran, he fell.','He ran. He fell.','He ran he fell.','Ran he fell.'], correct: 1 },
        { question: 'A semicolon (;) is used to:', options: ['End a sentence','Join two closely related independent clauses','Start a list','Replace a period always'], correct: 1 },
        { question: 'What is a run-on sentence?', options: ['A very long sentence','Two or more independent clauses joined without proper punctuation','A sentence with a comma','A complex sentence'], correct: 1 },
        { question: 'Which fix is correct for: "I love reading it is fun"?', options: ['"I love reading, it is fun."','"I love reading; it is fun."','"I love reading it is fun!"','"I love reading. it is fun."'], correct: 1 }
      ],
      'February': [
        { question: 'What is "tone" in literature?', options: ['The volume of the text','The author\'s attitude toward the subject','The genre','The setting'], correct: 1 },
        { question: 'What is "mood"?', options: ['The author\'s attitude','The feeling the text creates in the reader','The theme','The plot'], correct: 1 },
        { question: 'Which word describes a dark, gloomy mood?', options: ['Cheerful','Ominous','Humorous','Lighthearted'], correct: 1 },
        { question: 'An author creates tone through:', options: ['Word choice, imagery, and details','Only the title','Only dialogue','Only the setting'], correct: 0 },
        { question: 'The difference between tone and mood is:', options: ['There is no difference','Tone = author\'s attitude; Mood = reader\'s feeling','Tone is louder than mood','Mood comes first'], correct: 1 }
      ],
      'March': [
        { question: 'A reliable source is one that is:', options: ['Popular','Credible, accurate, and unbiased','Old','Free'], correct: 1 },
        { question: 'What is plagiarism?', options: ['Using big words','Using someone else\'s work without giving them credit','Writing your own ideas','Citing sources'], correct: 1 },
        { question: 'How do you avoid plagiarism?', options: ['Don\'t read anything','Cite all sources and use your own words (paraphrase)','Only use Wikipedia','Copy and paste'], correct: 1 },
        { question: 'A primary source is:', options: ['A summary of an event','An original document or firsthand account','A textbook','A blog post'], correct: 1 },
        { question: 'When evaluating a source, you should consider:', options: ['Only the design','Author credibility, date, bias, and accuracy','Only the length','Only the URL'], correct: 1 }
      ],
      'April': [
        { question: 'What is an argumentative essay?', options: ['A story','An essay that takes a position and supports it with evidence','A poem','A summary'], correct: 1 },
        { question: 'A counterclaim is:', options: ['Your main argument','An opposing viewpoint that you address and refute','Evidence','The conclusion'], correct: 1 },
        { question: 'Why address a counterclaim?', options: ['To make the essay longer','To show you understand opposing views and strengthen your argument','To confuse the reader','To agree with the other side'], correct: 1 },
        { question: 'What makes strong evidence?', options: ['Your personal opinion','Facts, statistics, expert quotes, and examples','Emotional language','Long paragraphs'], correct: 1 },
        { question: 'What is a "call to action" in an argumentative essay?', options: ['The thesis','A statement urging the reader to do something','A counterclaim','Evidence'], correct: 1 }
      ],
      'May': [
        { question: 'What does "cite" mean?', options: ['To read','To give credit to a source by naming it in your work','To copy','To summarize'], correct: 1 },
        { question: 'MLA format is commonly used for:', options: ['Science papers','English and humanities papers','Math problems','Art projects'], correct: 1 },
        { question: 'An in-text citation typically includes:', options: ['The full URL','Author\'s last name and page number','The title of the book','The publisher'], correct: 1 },
        { question: 'A Works Cited page lists:', options: ['Everything you read','All sources you actually cited in your essay','Only books','Only websites'], correct: 1 },
        { question: 'Why is proper citation important?', options: ['It makes essays longer','It gives credit, avoids plagiarism, and allows readers to find sources','It\'s optional','Teachers require it for no reason'], correct: 1 }
      ],
      'June': [
        { question: 'Which word is misspelled?', options: ['Accommodate','Recieve','Definitely','Separate'], correct: 1 },
        { question: '"Their" is used for:', options: ['A place (over there)','Possession (belonging to them)','A contraction of "they are"','An action'], correct: 1 },
        { question: '"Its" (no apostrophe) shows:', options: ['A contraction','Possession (belonging to it)','Plural','A question'], correct: 1 },
        { question: 'Which sentence uses the correct homophone?', options: ['"Your going to the store."','"You\'re going to the store."','"Yore going to the store."','None of these'], correct: 1 },
        { question: 'What was the most valuable writing skill you learned this year?', options: ['Thesis writing','Citing evidence','Grammar and punctuation','All of the above!'], correct: 3 }
      ]
    },

    // ---------- AGE 14 SCIENCE (Biology) ----------
    'age-14-science': {
      'September': [
        { question: 'What is the scientific method?', options: ['A random guessing process','A systematic approach to investigating questions through observation and experimentation','A type of microscope','A biology textbook'], correct: 1 },
        { question: 'What is a hypothesis?', options: ['A proven fact','A testable prediction about the outcome of an experiment','A conclusion','An observation'], correct: 1 },
        { question: 'In an experiment, the control group:', options: ['Gets the treatment being tested','Does NOT get the treatment -- used for comparison','Is ignored','Gets extra treatment'], correct: 1 },
        { question: 'An independent variable is:', options: ['The variable you measure','The variable you change/test','The control','The conclusion'], correct: 1 },
        { question: 'Why is it important to repeat experiments?', options: ['To waste time','To ensure results are reliable and not due to chance','Because scientists are bored','It isn\'t important'], correct: 1 }
      ],
      'October': [
        { question: 'What is the basic unit of life?', options: ['Atom','Cell','Organ','Molecule'], correct: 1 },
        { question: 'What does the nucleus of a cell do?', options: ['Makes energy','Stores DNA/genetic information','Digests food','Makes protein'], correct: 1 },
        { question: 'Mitochondria are called the "powerhouse" because they:', options: ['Store DNA','Produce ATP (energy)','Make protein','Control the cell'], correct: 1 },
        { question: 'What is the cell membrane\'s function?', options: ['To make energy','To control what enters and exits the cell','To store DNA','To make ribosomes'], correct: 1 },
        { question: 'Plant cells have which feature that animal cells do NOT?', options: ['Nucleus','Mitochondria','Cell wall and chloroplasts','Ribosomes'], correct: 2 }
      ],
      'November': [
        { question: 'Photosynthesis converts:', options: ['Sugar into energy','Sunlight, water, and CO₂ into glucose and oxygen','Oxygen into CO₂','Water into sugar only'], correct: 1 },
        { question: 'The equation for photosynthesis is approximately:', options: ['CO₂ + H₂O → glucose + O₂ (using light)','Glucose + O₂ → CO₂ + H₂O','O₂ + N₂ → protein','H₂O → H₂ + O₂'], correct: 0 },
        { question: 'Where does photosynthesis take place in a plant cell?', options: ['Mitochondria','Nucleus','Chloroplasts','Cell membrane'], correct: 2 },
        { question: 'Cellular respiration is the process of:', options: ['Making food from sunlight','Breaking down glucose to release energy (ATP)','Photosynthesis','Cell division'], correct: 1 },
        { question: 'What gas do plants absorb for photosynthesis?', options: ['Oxygen','Nitrogen','Carbon dioxide (CO₂)','Hydrogen'], correct: 2 }
      ],
      'December': [
        { question: 'DNA stands for:', options: ['Deoxyribonucleic acid','Dinitrogen acid','Dynamic Nuclear Assembly','Digital Nucleic Acid'], correct: 0 },
        { question: 'The shape of DNA is called a:', options: ['Single strand','Circle','Double helix','Square'], correct: 2 },
        { question: 'What are the base pairs in DNA?', options: ['A-T and G-C','A-G and T-C','A-C and G-T','A-A and T-T'], correct: 0 },
        { question: 'A gene is:', options: ['A type of cell','A segment of DNA that codes for a specific trait','A protein','An organ'], correct: 1 },
        { question: 'What does RNA do?', options: ['Stores genetic info permanently','Carries genetic instructions from DNA to make proteins','Makes ATP','Protects the cell'], correct: 1 }
      ],
      'January': [
        { question: 'What is heredity?', options: ['The study of fossils','The passing of traits from parents to offspring','A type of cell division','A genetic disease'], correct: 1 },
        { question: 'A dominant allele:', options: ['Always hides when paired with recessive','Is always expressed (shown) when present','Is the weaker trait','Only appears in males'], correct: 1 },
        { question: 'A recessive allele is expressed when:', options: ['One copy is present','Two copies are present (homozygous recessive)','The dominant allele is present','Never expressed'], correct: 1 },
        { question: 'If B = brown eyes (dominant) and b = blue eyes (recessive), what eye color does Bb have?', options: ['Blue','Brown','Green','Mixed'], correct: 1 },
        { question: 'A Punnett square is used to:', options: ['Measure temperature','Predict the probability of genetic outcomes','Count cells','Grow plants'], correct: 1 }
      ],
      'February': [
        { question: 'Mitosis results in:', options: ['4 unique cells','2 identical daughter cells','1 cell','Gametes (sex cells)'], correct: 1 },
        { question: 'Meiosis results in:', options: ['2 identical cells','4 genetically unique cells (gametes)','1 cell','Body cells'], correct: 1 },
        { question: 'What is a mutation?', options: ['A type of cell','A change in the DNA sequence','A protein','An organ'], correct: 1 },
        { question: 'Why is meiosis important for sexual reproduction?', options: ['It makes identical cells','It creates genetic diversity through unique gametes','It heals wounds','It stores energy'], correct: 1 },
        { question: 'Which type of cell division is used for growth and repair?', options: ['Meiosis','Mitosis','Binary fission','Budding'], correct: 1 }
      ],
      'March': [
        { question: 'An ecosystem includes:', options: ['Only living things','Only nonliving things','Both living organisms and their nonliving environment','Only plants'], correct: 2 },
        { question: 'A food web shows:', options: ['One simple food chain','The interconnected feeding relationships in an ecosystem','Only predators','Only plants'], correct: 1 },
        { question: 'What is a producer in an ecosystem?', options: ['An animal that eats plants','An organism that makes its own food (like plants)','A decomposer','A carnivore'], correct: 1 },
        { question: 'Energy flows through an ecosystem in:', options: ['Cycles (round and round)','One direction -- from sun to producers to consumers','Randomly','Only through water'], correct: 1 },
        { question: 'A decomposer\'s role is to:', options: ['Make food from sunlight','Break down dead organisms and recycle nutrients','Eat plants','Hunt prey'], correct: 1 }
      ],
      'April': [
        { question: 'What is natural selection?', options: ['Humans choosing traits','Organisms with favorable traits survive and reproduce more successfully','Random mutations','A type of cell division'], correct: 1 },
        { question: 'Who developed the theory of evolution by natural selection?', options: ['Gregory Mendel','Charles Darwin','Isaac Newton','Louis Pasteur'], correct: 1 },
        { question: 'An adaptation is:', options: ['A random trait','A trait that helps an organism survive in its environment','A mutation that is always harmful','A type of fossil'], correct: 1 },
        { question: 'Fossils provide evidence for evolution because they:', options: ['Show what animals ate','Show how species have changed over time','Are always complete','Only show plants'], correct: 1 },
        { question: '"Survival of the fittest" means:', options: ['The strongest animal always wins','Organisms best suited to their environment survive and reproduce','The fastest animal survives','Only carnivores survive'], correct: 1 }
      ],
      'May': [
        { question: 'What is homeostasis?', options: ['A disease','The body\'s ability to maintain stable internal conditions','A type of cell','A body system'], correct: 1 },
        { question: 'Which system is responsible for fighting disease?', options: ['Digestive','Immune','Nervous','Skeletal'], correct: 1 },
        { question: 'The nervous system controls:', options: ['Digestion','Body movement, thoughts, and signals between body parts','Blood flow','Bone growth'], correct: 1 },
        { question: 'The circulatory system\'s main job is to:', options: ['Digest food','Pump blood to deliver oxygen and nutrients throughout the body','Fight disease','Control hormones'], correct: 1 },
        { question: 'Which system includes the kidneys and bladder?', options: ['Respiratory','Excretory/Urinary','Digestive','Muscular'], correct: 1 }
      ],
      'June': [
        { question: 'A controlled experiment must have:', options: ['Only one trial','A control group and experimental group with one variable changed','No variables','Multiple independent variables'], correct: 1 },
        { question: 'To analyze data, scientists might use:', options: ['Guesses','Tables, graphs, and statistical analysis','Only observation','Only reading'], correct: 1 },
        { question: 'A scientific theory is:', options: ['A guess','A well-supported explanation based on extensive evidence','A hypothesis','Always true and unchangeable'], correct: 1 },
        { question: 'Why is peer review important in science?', options: ['To make papers longer','To ensure research is evaluated by other experts for quality and accuracy','To delay publication','It isn\'t important'], correct: 1 },
        { question: 'What was the most interesting biology topic this year?', options: ['Cells and DNA','Ecology','Evolution','All of them were fascinating!'], correct: 3 }
      ]
    },

    // ---------- AGE 14 SOCIAL STUDIES ----------
    'age-14-social-studies': {
      'September': [
        { question: 'What does "civilization" mean?', options: ['A modern city','A complex society with organized government, culture, and writing','A small village','A type of government'], correct: 1 },
        { question: 'The Fertile Crescent was important because:', options: ['It had the most gold','It had fertile soil between rivers, enabling agriculture','It was the coldest region','It had no people'], correct: 1 },
        { question: 'Mesopotamia is often called the "Cradle of Civilization" because:', options: ['It was the newest civilization','It was one of the earliest civilizations with writing, laws, and cities','It was the largest','It was in Europe'], correct: 1 },
        { question: 'Which river valley was home to ancient Egyptian civilization?', options: ['Tigris','Amazon','Nile','Mississippi'], correct: 2 },
        { question: 'The Neolithic Revolution refers to:', options: ['A war','The shift from hunting/gathering to farming and settled life','A scientific discovery','A political movement'], correct: 1 }
      ],
      'October': [
        { question: 'Ancient Greece is known as the birthplace of:', options: ['Agriculture','Democracy and Western philosophy','Gunpowder','The printing press'], correct: 1 },
        { question: 'Which Greek city-state was known for its military culture?', options: ['Athens','Sparta','Corinth','Thebes'], correct: 1 },
        { question: 'Socrates, Plato, and Aristotle were:', options: ['Roman emperors','Greek philosophers','Egyptian pharaohs','Persian kings'], correct: 1 },
        { question: 'What was the Parthenon?', options: ['A Roman arena','A Greek temple dedicated to Athena','A Persian palace','An Egyptian pyramid'], correct: 1 },
        { question: 'Athenian democracy was different from modern democracy because:', options: ['Everyone could vote','Only adult male citizens could vote -- no women, slaves, or foreigners','No one voted','It was exactly the same'], correct: 1 }
      ],
      'November': [
        { question: 'The Roman Republic was governed by:', options: ['A king','Elected representatives (senators and consuls)','A military general only','Religious leaders'], correct: 1 },
        { question: 'What was the Pax Romana?', options: ['A Roman war','A long period of peace and stability in the Roman Empire','A Roman building','A type of Roman food'], correct: 1 },
        { question: 'What contributed to the fall of the Roman Empire?', options: ['Only one cause','Multiple causes: economic trouble, invasions, corruption, and overexpansion','A single battle','An earthquake'], correct: 1 },
        { question: 'Julius Caesar was:', options: ['A Greek philosopher','A Roman leader who was assassinated after gaining too much power','An Egyptian pharaoh','A medieval king'], correct: 1 },
        { question: 'Roman engineering achievements included:', options: ['Only weapons','Aqueducts, roads, and the Colosseum','Only ships','Only farms'], correct: 1 }
      ],
      'December': [
        { question: 'The medieval feudal system was based on:', options: ['Democracy','Land ownership and loyalty between lords and vassals','Free trade','Religious voting'], correct: 1 },
        { question: 'A serf was:', options: ['A king','A peasant who was bound to the land and worked for a lord','A knight','A merchant'], correct: 1 },
        { question: 'The Crusades were:', options: ['Sports events','Religious wars between Christians and Muslims over the Holy Land','Farming festivals','Peace treaties'], correct: 1 },
        { question: 'The Black Death was:', options: ['A type of poetry','A devastating plague that killed millions in Europe','A war','A volcanic eruption'], correct: 1 },
        { question: 'What was a guild in medieval times?', options: ['A type of castle','An association of craftsmen or merchants','A weapon','A church'], correct: 1 }
      ],
      'January': [
        { question: 'The Renaissance began in which country?', options: ['England','France','Italy','Spain'], correct: 2 },
        { question: '"Renaissance" means:', options: ['Ending','Rebirth','War','Exploration'], correct: 1 },
        { question: 'Leonardo da Vinci was:', options: ['Only a painter','A painter, inventor, scientist, and thinker','A king','An explorer'], correct: 1 },
        { question: 'The printing press was invented by:', options: ['Leonardo da Vinci','Johannes Gutenberg','Isaac Newton','Galileo'], correct: 1 },
        { question: 'How did the printing press change society?', options: ['It made books more expensive','It made knowledge and books widely available, spreading new ideas','It had no impact','It only printed money'], correct: 1 }
      ],
      'February': [
        { question: 'The Age of Exploration was driven by the desire for:', options: ['Only knowledge','New trade routes, wealth, and spread of religion','Only adventure','Only science'], correct: 1 },
        { question: 'Christopher Columbus sailed in:', options: ['1776','1492','1066','1215'], correct: 1 },
        { question: 'What was the Columbian Exchange?', options: ['A trade deal','The transfer of goods, ideas, and diseases between the Old and New Worlds','A currency exchange','A peace treaty'], correct: 1 },
        { question: 'Which European country first explored Africa\'s coast for trade?', options: ['Spain','England','Portugal','France'], correct: 2 },
        { question: 'A negative effect of exploration was:', options: ['New foods','Disease and colonization that devastated indigenous populations','Maps','Ships'], correct: 1 }
      ],
      'March': [
        { question: 'The Industrial Revolution began in which country?', options: ['France','United States','Great Britain','Germany'], correct: 2 },
        { question: 'What was a major change during the Industrial Revolution?', options: ['People moved from cities to farms','Shift from hand production to machine manufacturing in factories','Less pollution','Fewer goods produced'], correct: 1 },
        { question: 'Urbanization during this period means:', options: ['People moving to rural areas','People moving from farms to cities for factory jobs','Building more farms','Less population'], correct: 1 },
        { question: 'A negative effect of early industrialization was:', options: ['Higher wages for everyone','Harsh working conditions, child labor, and pollution','More free time','Better education'], correct: 1 },
        { question: 'The steam engine was important because it:', options: ['Cooked food','Powered factories, trains, and ships -- transforming transportation and manufacturing','Cleaned water','Made clothing'], correct: 1 }
      ],
      'April': [
        { question: 'What caused World War I?', options: ['Only one event','A combination of alliances, militarism, imperialism, and nationalism (triggered by assassination)','A single invasion','Religious differences'], correct: 1 },
        { question: 'Trench warfare in WWI led to:', options: ['Quick victories','Long deadly stalemates with horrific conditions','Air battles','Naval battles only'], correct: 1 },
        { question: 'The assassination that triggered WWI was of:', options: ['King of England','Archduke Franz Ferdinand of Austria-Hungary','The Kaiser','The Tsar'], correct: 1 },
        { question: 'The Treaty of Versailles:', options: ['Created lasting peace','Punished Germany heavily with war guilt and reparations, contributing to future conflict','Was fair to all sides','Ended all empires'], correct: 1 },
        { question: 'The United States entered WWI in:', options: ['1914','1917','1918','1916'], correct: 1 }
      ],
      'May': [
        { question: 'What was the Holocaust?', options: ['A battle','The systematic genocide of 6 million Jews and millions of others by Nazi Germany','A peace treaty','An economic crisis'], correct: 1 },
        { question: 'D-Day (June 6, 1944) was:', options: ['The end of the war','The Allied invasion of Normandy to liberate Western Europe from Nazi control','A bombing of Japan','A sea battle'], correct: 1 },
        { question: 'The atomic bombs were dropped on:', options: ['Berlin and Tokyo','Hiroshima and Nagasaki','London and Paris','Moscow and Beijing'], correct: 1 },
        { question: 'What was the primary cause of WWII?', options: ['Only economic depression','Aggressive expansion by Nazi Germany, fascist Italy, and imperial Japan','A single assassination','Religious war'], correct: 1 },
        { question: 'The Allied powers in WWII included:', options: ['Germany, Italy, Japan','USA, Great Britain, Soviet Union, and others','Only the USA','Only European countries'], correct: 1 }
      ],
      'June': [
        { question: 'What is civics?', options: ['A type of car','The study of the rights and duties of citizens','A math subject','A science topic'], correct: 1 },
        { question: 'A democratic government gets its power from:', options: ['The military','The people (citizens who vote)','One leader','Foreign countries'], correct: 1 },
        { question: 'What is a constitution?', options: ['A type of law','A document establishing the fundamental laws and principles of a government','A treaty','A declaration of war'], correct: 1 },
        { question: 'Basic economics studies:', options: ['Only money','How societies allocate scarce resources to meet unlimited wants','Only business','Only government spending'], correct: 1 },
        { question: 'What was the most interesting historical period you studied this year?', options: ['Ancient civilizations','The World Wars','The Renaissance','All of them!'], correct: 3 }
      ]
    },

'age-8-math': {
  'September': [
    { question: 'In the number 5,382, what is the value of the digit 3?', options: ['3', '30', '300', '3,000'], correct: 2 },
    { question: 'What is 4,506 written in expanded form?', options: ['400 + 50 + 6', '4,000 + 500 + 6', '4,000 + 50 + 6', '4,000 + 500 + 60'], correct: 1 },
    { question: 'What is 347 rounded to the nearest 10?', options: ['340', '345', '350', '300'], correct: 2 },
    { question: 'What is 650 rounded to the nearest 100?', options: ['600', '650', '700', '500'], correct: 2 },
    { question: 'When solving 500 - 243, what is the correct answer?', options: ['257', '343', '267', '357'], correct: 0 }
  ],
  'October': [
    { question: 'If you have 4 plates with 3 cookies on each plate, which multiplication equation matches?', options: ['4 + 3 = 7', '4 x 3 = 12', '3 x 7 = 21', '12 / 4 = 3'], correct: 1 },
    { question: 'If you rotate a 3-row by 5-column array 90 degrees, what happens to the multiplication fact?', options: ['It becomes 3 x 5 = 15', 'It becomes 5 x 3 = 15', 'The answer changes to 8', 'The answer changes to 45'], correct: 1 },
    { question: 'What pattern do you notice in the multiples of 10?', options: ['They all end in 5', 'They all end in 0', 'They are all odd numbers', 'They all end in 2'], correct: 1 },
    { question: 'To figure out 4 x 6, you can double 6 to get 12, then double it again. What is 4 x 6?', options: ['12', '18', '24', '30'], correct: 2 },
    { question: 'Which strategy helps you solve 3 x 7 if you know 2 x 7 = 14?', options: ['Double 14 to get 28', 'Add one more 7 to 14 to get 21', 'Subtract 7 from 14 to get 7', 'Multiply 14 by 2 to get 28'], correct: 1 }
  ],
  'November': [
    { question: 'You have 15 pennies and divide them equally into 3 cups. How many pennies are in each cup?', options: ['3', '5', '12', '15'], correct: 1 },
    { question: 'You have 20 blocks and make groups of 4. How many groups do you make?', options: ['4', '5', '16', '24'], correct: 1 },
    { question: 'Which set of equations forms a complete fact family using 4, 5, and 20?', options: ['4x5=20, 5x4=20 only', '20/4=5, 20/5=4 only', '4x5=20, 5x4=20, 20/4=5, 20/5=4', '4+5=9, 5+4=9, 9-4=5, 9-5=4'], correct: 2 },
    { question: 'If 5 x __ = 35, what is the missing number?', options: ['5', '6', '7', '8'], correct: 2 },
    { question: 'A baker has 24 muffins and puts them into boxes of 4. How many boxes does the baker need?', options: ['4', '6', '8', '20'], correct: 1 }
  ],
  'December': [
    { question: 'How do you write the number 14 using tally marks?', options: ['Four lines with no cross', 'Two groups of 5 with 4 extra lines', 'One group of 5 crossed and 9 more', 'One group of 5 crossed, one group of 5 crossed, and 4 more'], correct: 3 },
    { question: 'In a picture graph, one smiley face equals 2 votes. If a category shows 4 smiley faces, how many votes does it represent?', options: ['2', '4', '6', '8'], correct: 3 },
    { question: 'Which part of a bar graph shows the categories being compared?', options: ['The title', 'The y-axis (numbered scale)', 'The x-axis (category labels)', 'The color of the bars'], correct: 2 },
    { question: 'On a line plot, you place an X above the measurement for each item. If three books measure exactly 6 inches wide, what do you see above the 6?', options: ['One X', 'Two Xs', 'Three Xs', 'A bar'], correct: 2 },
    { question: 'Why do we use a "key" in a picture graph?', options: ['To show what the graph is about', 'To tell what each picture symbol represents', 'To show the total number of items', 'To make the graph colorful'], correct: 1 }
  ],
  'January': [
    { question: 'Which of these is NOT a polygon?', options: ['A triangle', 'A square', 'A circle', 'A pentagon'], correct: 2 },
    { question: 'What makes a square special compared to other rectangles?', options: ['It has 4 sides', 'It has right angles', 'It has 4 equal sides AND 4 right angles', 'It has 2 pairs of parallel sides'], correct: 2 },
    { question: 'If you cover a book with 24 square sticky notes without gaps, what did you just measure?', options: ['The perimeter of the book', 'The area of the book', 'The length of the book', 'The weight of the book'], correct: 1 },
    { question: 'What is the difference between perimeter and area?', options: ['Perimeter measures length, area measures weight', 'Perimeter measures the inside space, area measures the outside edge', 'Perimeter measures around the outside, area measures the inside space', 'They measure the same thing'], correct: 2 },
    { question: 'A rectangle has sides of 3 units and 4 units. What is its perimeter?', options: ['7 units', '10 units', '12 units', '14 units'], correct: 3 }
  ],
  'February': [
    { question: 'On an analog clock, the small tick marks between the numbers represent what?', options: ['Hours', '5-minute intervals', 'Single minutes', 'Seconds'], correct: 2 },
    { question: 'A movie starts at 3:15 and lasts 45 minutes. What time does it end?', options: ['3:45', '3:50', '4:00', '4:15'], correct: 2 },
    { question: 'Which unit would you use to measure the volume of a bathtub?', options: ['Milliliters', 'Grams', 'Liters', 'Kilograms'], correct: 2 },
    { question: 'Which unit would you use to measure the mass of a feather?', options: ['Kilograms', 'Grams', 'Liters', 'Meters'], correct: 1 },
    { question: 'How many milliliters are in 1 liter?', options: ['10', '100', '500', '1,000'], correct: 3 }
  ],
  'March': [
    { question: 'In the fraction 1/6, what does the 6 tell you?', options: ['How many parts you have', 'The whole is cut into 6 equal parts', 'You need 6 more parts', 'It is the sixth fraction'], correct: 1 },
    { question: 'If a circle is cut into 8 equal parts and 3 are shaded, what fraction is shaded?', options: ['1/8', '3/8', '5/8', '8/3'], correct: 1 },
    { question: 'On a number line from 0 to 1, where would you place 3/4?', options: ['Exactly in the middle', 'One mark before 1', 'Three marks past 0 if divided into fourths', 'Right at the 3'], correct: 2 },
    { question: 'Which is larger: 1/3 or 1/6?', options: ['1/6 because 6 is bigger', '1/3 because the whole is divided into fewer pieces', 'They are the same size', 'You cannot tell without a picture'], correct: 1 },
    { question: 'Which pair shows equivalent fractions?', options: ['1/2 and 2/3', '1/4 and 2/4', '1/2 and 2/4', '2/3 and 3/4'], correct: 2 }
  ],
  'April': [
    { question: 'A rectangle is 7 units long and 5 units wide. Which equation gives its area?', options: ['7 + 5 = 12', '7 x 5 = 35', '7 + 7 + 5 + 5 = 24', '7 - 5 = 2'], correct: 1 },
    { question: 'To find 5 x 12, you can split it into 5 x 10 and 5 x 2. What property is this?', options: ['Commutative property', 'Distributive property', 'Associative property', 'Identity property'], correct: 1 },
    { question: 'An L-shape can be split into two rectangles with areas of 20 and 15 square units. What is the total area?', options: ['5 square units', '30 square units', '35 square units', '300 square units'], correct: 2 },
    { question: 'Two rectangles both have a perimeter of 16 units. One is 4x4 and the other is 2x6. Which has a larger area?', options: ['The 2x6 rectangle (area 12)', 'The 4x4 rectangle (area 16)', 'They have the same area', 'You cannot tell'], correct: 1 },
    { question: 'If a rectangle has a perimeter of 20 units and one side is 4 units, what is the other side length?', options: ['4 units', '5 units', '6 units', '8 units'], correct: 2 }
  ],
  'May': [
    { question: 'If 36 / m = 9, what is the value of m?', options: ['3', '4', '6', '12'], correct: 1 },
    { question: 'In the 9s multiplication facts, what pattern do you notice in the digits (09, 18, 27, 36...)?', options: ['The tens digit goes down by 1 and the ones digit goes up by 1', 'Both digits always add up to 9', 'The ones digit is always even', 'The number doubles each time'], correct: 1 },
    { question: 'Sam bought 3 packs of cards with 5 cards each, then gave 4 cards away. Which equation shows this?', options: ['3 + 5 - 4 = 4', '3 x 5 - 4 = 11', '3 x 5 + 4 = 19', '5 - 3 + 4 = 6'], correct: 1 },
    { question: 'Before solving 48 + 33 exactly, what is a good estimate?', options: ['40 + 30 = 70', '50 + 30 = 80', '48 + 33 = 71', '50 + 40 = 90'], correct: 1 },
    { question: 'Why is it helpful to estimate an answer before solving a problem?', options: ['It makes the problem easier to solve', 'It helps catch big mistakes like accidentally subtracting instead of adding', 'It gives you the exact answer', 'You do not need to solve the problem after estimating'], correct: 1 }
  ],
  'June': [
    { question: 'Which fact family equation helps you check that 42 / 6 = 7?', options: ['42 + 6 = 48', '6 x 7 = 42', '42 - 6 = 36', '7 + 6 = 13'], correct: 1 },
    { question: 'On a number line, which fraction is closer to 1: 3/4 or 5/8?', options: ['5/8', '3/4', 'They are the same', 'Neither is close to 1'], correct: 1 },
    { question: 'A garden box is made of wood that is 40 feet long. If the box is rectangular and one side is 12 feet, what is the other side?', options: ['8 feet', '10 feet', '14 feet', '28 feet'], correct: 0 },
    { question: 'You are planning a party with a $50 budget. You buy 3 packs of balloons at $2 each and a cake for $15. How much money do you have left?', options: ['$29', '$30', '$35', '$41'], correct: 0 },
    { question: 'What was your favorite math topic this year?', options: ['Multiplication and division', 'Fractions', 'Geometry and area', 'All of the above!'], correct: 3 }
  ]
},
'age-8-english': {
  'September': [
    { question: 'Using the Five Finger Rule, if you read a page and miss 4-5 words, the book is probably:', options: ['Too easy', 'Just right', 'Too hard', 'The perfect book'], correct: 2 },
    { question: 'In a story, the SETTING tells you:', options: ['Who the main character is', 'Where and when the story takes place', 'What the problem is', 'How the story ends'], correct: 1 },
    { question: 'On a "Story Mountain," the peak of the mountain represents:', options: ['The beginning of the story', 'The resolution', 'The climax (biggest problem)', 'The setting'], correct: 2 },
    { question: 'When reading aloud with expression, you should:', options: ['Read as fast as possible', 'Change your voice for different characters and pause at punctuation', 'Skip words you do not know', 'Never stop to take a breath'], correct: 1 },
    { question: 'Which of these is an example of a "small moment" seed story?', options: ['My whole summer vacation', 'The wave that knocked down my sandcastle', 'Everything I did last weekend', 'All the foods I ate this month'], correct: 1 }
  ],
  'October': [
    { question: 'A "small moment" story is different from a "watermelon topic" because:', options: ['It is about a big event', 'It zooms in on one specific moment with detail', 'It covers many days', 'It has no setting'], correct: 1 },
    { question: 'In a Story Arc, what comes RIGHT BEFORE the resolution?', options: ['The lead (hook)', 'The climax', 'The falling action', 'The rising action'], correct: 2 },
    { question: 'Which sentence SHOWS nervousness instead of just TELLING it?', options: ['I was nervous.', 'My hands were sweaty and my stomach had butterflies.', 'I felt scared.', 'It was a scary day.'], correct: 1 },
    { question: 'What does CUPS stand for when editing your writing?', options: ['Capitalization, Usage, Punctuation, Spelling', 'Colors, Underlines, Pictures, Sentences', 'Characters, Understanding, Plot, Setting', 'Clear, Unique, Perfect, Special'], correct: 0 },
    { question: 'When revising a story, ARMS stands for:', options: ['Always Read My Story', 'Add, Remove, Move, Substitute', 'Animals, Rhymes, Monsters, Settings', 'Art, Reading, Math, Science'], correct: 1 }
  ],
  'November': [
    { question: 'Which of these is a proper noun?', options: ['dog', 'city', 'Seattle', 'teacher'], correct: 2 },
    { question: 'What does a possessive noun show?', options: ['An action', 'More than one', 'Ownership', 'A describing word'], correct: 2 },
    { question: 'What are the three verb tenses?', options: ['Big, small, medium', 'Past, present, future', 'Singular, plural, collective', 'Action, linking, helping'], correct: 1 },
    { question: 'Which word is an adjective in this sentence: "The small brown dog ran quickly."', options: ['dog', 'ran', 'small', 'quickly'], correct: 2 },
    { question: 'A complete sentence needs both a subject and a:', options: ['Adjective', 'Predicate (what the subject does)', 'Noun', 'Prefix'], correct: 1 }
  ],
  'December': [
    { question: 'Which non-fiction text feature helps you find specific topics quickly?', options: ['The glossary', 'The index', 'A caption', 'A heading'], correct: 1 },
    { question: 'The main idea of a non-fiction passage is:', options: ['Always the first sentence', 'The most interesting detail', 'What the whole passage is mostly about', 'The title of the book'], correct: 2 },
    { question: 'When taking notes, you should:', options: ['Write complete sentences', 'Copy word for word from the book', 'Use keywords and phrases in your own words', 'Only write down the first sentence'], correct: 2 },
    { question: 'A good summary of an informational text should include:', options: ['Every single detail from the passage', 'The main idea and key details in your own words', 'Only the title and author', 'Your opinion about the topic'], correct: 1 },
    { question: 'Which of these is a non-fiction text feature?', options: ['A chapter title', 'A bold print word with a glossary definition', 'A character speaking in dialogue', 'A rhyming pattern'], correct: 1 }
  ],
  'January': [
    { question: 'Which of these is a FACT?', options: ['Pizza is the best food', 'The Earth orbits the Sun', 'Summer is the most fun season', 'Dogs are better than cats'], correct: 1 },
    { question: 'In the OREO method for opinion writing, what does the first O stand for?', options: ['Organize', 'Opinion', 'Outstanding', 'Observe'], correct: 1 },
    { question: 'Which linking word shows a CONTRAST between two ideas?', options: ['because', 'also', 'however', 'for example'], correct: 2 },
    { question: 'A persuasive letter should end with:', options: ['A new topic', 'A joke', 'A call to action asking the reader to do something', 'A list of all the reasons they are wrong'], correct: 2 },
    { question: 'Which signal word often appears in opinions?', options: ['proven', 'measured', 'best', 'exactly'], correct: 2 }
  ],
  'February': [
    { question: 'What does the prefix "un-" mean when added to a root word?', options: ['Again', 'Before', 'Not', 'Wrong'], correct: 2 },
    { question: 'The suffix "-ful" in "grateful" means:', options: ['Without', 'Full of', 'A person who', 'In a certain way'], correct: 1 },
    { question: '"The girl was ravenous after skipping lunch and ate three sandwiches." What does "ravenous" probably mean?', options: ['Sad', 'Very hungry', 'Tired', 'Happy'], correct: 1 },
    { question: 'What do guide words at the top of a dictionary page tell you?', options: ['How to pronounce the word', 'The first and last word on that page', 'The definition of the hardest word', 'How many pages are in the dictionary'], correct: 1 },
    { question: 'If you see the word "disagree," the prefix "dis-" tells you it means:', options: ['To agree again', 'To agree before', 'Not to agree', 'To agree wrongly'], correct: 2 }
  ],
  'March': [
    { question: 'What is the difference between a stanza and a line in poetry?', options: ['They are the same thing', 'A line is one row; a stanza is a group of lines', 'A stanza is one word; a line is a sentence', 'Lines rhyme but stanzas do not'], correct: 1 },
    { question: '"Her smile was as bright as the sun" is an example of:', options: ['A metaphor', 'A simile', 'Onomatopoeia', 'Alliteration'], correct: 1 },
    { question: 'Which of these words is an example of onomatopoeia?', options: ['Beautiful', 'Quickly', 'Buzz', 'Running'], correct: 2 },
    { question: 'A haiku has how many syllables in its three lines?', options: ['5-5-5', '7-5-7', '5-7-5', '3-5-3'], correct: 2 },
    { question: '"Peter Piper picked a peck of pickled peppers" is an example of:', options: ['Simile', 'Onomatopoeia', 'Metaphor', 'Alliteration'], correct: 3 }
  ],
  'April': [
    { question: 'Which of these is a common fairy tale element?', options: ['A science experiment', 'Things happening in 3s or 7s', 'A bibliography', 'Realistic modern settings'], correct: 1 },
    { question: 'A "fractured" fairy tale is:', options: ['A broken story', 'A version that changes a key element like the point of view or setting', 'A story about bones', 'A story that does not have an ending'], correct: 1 },
    { question: 'What is the main difference between a fable and a fairy tale?', options: ['Fables have animals and teach a moral; fairy tales have magic', 'Fables are longer', 'Fairy tales are always true', 'Fables do not have characters'], correct: 0 },
    { question: '"Slow and steady wins the race" is the moral of which fable?', options: ['The Lion and the Mouse', 'The Ant and the Grasshopper', 'The Tortoise and the Hare', 'The Boy Who Cried Wolf'], correct: 2 },
    { question: 'A Venn diagram helps you compare two stories by showing:', options: ['Only the differences', 'Only the similarities', 'Similarities in the middle and differences on each side', 'The chronological order of events'], correct: 2 }
  ],
  'May': [
    { question: 'When starting a research project, why should you write "I Wonder" questions?', options: ['To make the project longer', 'They become your roadmap for what to research', 'The teacher requires exactly 10 questions', 'They are always easy to answer'], correct: 1 },
    { question: 'Why should you use MULTIPLE sources for research?', options: ['One book is never enough pages', 'Different sources may provide different information', 'You get extra credit for more sources', 'You only need one source'], correct: 1 },
    { question: 'The introduction paragraph of a research report should:', options: ['List every fact you found', 'Hook the reader and state the topic', 'Give the conclusion first', 'Be longer than the body paragraphs'], correct: 1 },
    { question: 'What text feature should a research report include to show where information came from?', options: ['A table of contents', 'A "Sources" or "Works Cited" page', 'A fictional story', 'A poem'], correct: 1 },
    { question: 'What is the last step before publishing a research report?', options: ['Choosing a topic', 'Writing the introduction', 'Revising and editing with CUPS', 'Making a cover'], correct: 2 }
  ],
  'June': [
    { question: 'A fluent reader at the end of Grade 3 should read at least how many words correct per minute?', options: ['60 WCPM', '70 WCPM', '90 WCPM', '120 WCPM'], correct: 2 },
    { question: 'Which grammar skill did you practice in November?', options: ['Writing haiku poems', 'Identifying nouns, verbs, and adjectives', 'Research reports', 'Fairy tales'], correct: 1 },
    { question: 'At a "Poetry Cafe," the best way to perform a poem is by:', options: ['Reading as fast as you can', 'Using expression, pacing, and eye contact', 'Whispering so nobody hears mistakes', 'Skipping the hard words'], correct: 1 },
    { question: 'A writing portfolio helps you see:', options: ['Only your mistakes', 'How your writing has improved over the year', 'What other students wrote', 'How many books you read'], correct: 1 },
    { question: 'What was your favorite writing project this year?', options: ['Personal narrative stories', 'Poetry anthology', 'Research report', 'All of the above!'], correct: 3 }
  ]
},
'age-8-science': {
  'September': [
    { question: 'What are the five basic steps of the scientific method in order?', options: ['Guess, test, think, watch, write', 'Observe, question, hypothesize, test, conclude', 'Read, write, draw, build, share', 'Ask, build, break, fix, show'], correct: 1 },
    { question: 'Oobleck is hard to classify because:', options: ['It is always a solid', 'It is always a liquid', 'It behaves like both a solid and a liquid depending on pressure', 'It is a gas'], correct: 2 },
    { question: 'When making ice cream in a bag, what does the salt do?', options: ['Makes it taste better', 'Makes the ice colder so the liquid freezes faster', 'Keeps the bag closed', 'Turns the milk into water'], correct: 1 },
    { question: 'In a DIY lava lamp, why does the oil float on top of the water?', options: ['Oil is heavier than water', 'Oil is less dense than water', 'Water and oil are the same density', 'The food coloring pushes it up'], correct: 1 },
    { question: 'What three things can cause matter to change states?', options: ['Stirring, pouring, shaking', 'Temperature changes (heating or cooling)', 'Cutting, folding, coloring', 'Adding water, salt, or sugar'], correct: 1 }
  ],
  'October': [
    { question: 'A force is defined as:', options: ['Something that makes light', 'A push or a pull', 'A type of magnet', 'A kind of energy'], correct: 1 },
    { question: 'Why does a parachute slow down a falling object?', options: ['It makes the object lighter', 'Air resistance pushes up against the parachute', 'It stops gravity', 'It makes the object float'], correct: 1 },
    { question: 'Friction is a force that:', options: ['Speeds things up', 'Opposes motion between two surfaces', 'Makes objects float', 'Creates electricity'], correct: 1 },
    { question: 'On a lever, the fixed point it balances on is called the:', options: ['Arm', 'Load', 'Fulcrum', 'Effort'], correct: 2 },
    { question: 'Which simple machine makes it easier to lift heavy objects by using a slanted surface?', options: ['A lever', 'A wheel', 'An inclined plane (ramp)', 'A pulley'], correct: 2 }
  ],
  'November': [
    { question: 'Magnets can attract which types of metals?', options: ['Aluminum and copper', 'Iron, nickel, and cobalt', 'Gold and silver', 'All metals'], correct: 1 },
    { question: 'What is the rule about magnetic poles?', options: ['All poles attract each other', 'Opposite poles attract; like poles repel', 'North poles attract north poles', 'South poles repel south poles only'], correct: 1 },
    { question: 'Can a magnetic field pass through solid materials like glass or cardboard?', options: ['No, it is blocked by all solids', 'Yes, it can pass through many solid materials', 'Only through metal', 'Only through water'], correct: 1 },
    { question: 'When you rub a balloon on your hair and it attracts small objects, you are creating:', options: ['Magnetism', 'Gravity', 'Static electricity', 'Friction'], correct: 2 },
    { question: 'Which item would a magnet NOT attract?', options: ['A paperclip', 'An iron nail', 'A wooden pencil', 'A steel key'], correct: 2 }
  ],
  'December': [
    { question: 'What are the three main parts of the water cycle?', options: ['Rain, snow, hail', 'Evaporation, condensation, precipitation', 'Ocean, river, lake', 'Clouds, wind, lightning'], correct: 1 },
    { question: 'An anemometer is an instrument that measures:', options: ['Temperature', 'Wind speed', 'Rainfall', 'Humidity'], correct: 1 },
    { question: 'What is the difference between weather and climate?', options: ['They mean the same thing', 'Weather is short-term conditions; climate is long-term patterns', 'Climate changes daily; weather stays the same', 'Weather is only about rain; climate is only about temperature'], correct: 1 },
    { question: 'When you swirl water in a connected pair of bottles, you create a model of a:', options: ['Hurricane', 'Tornado (vortex)', 'Earthquake', 'Tsunami'], correct: 1 },
    { question: 'Which heats up faster in sunlight: land or water?', options: ['Water heats up faster', 'Land heats up faster', 'They heat up at the same rate', 'Neither heats up from sunlight'], correct: 1 }
  ],
  'January': [
    { question: 'What is the correct order of the planets from the Sun (first four)?', options: ['Mars, Venus, Earth, Mercury', 'Mercury, Venus, Earth, Mars', 'Earth, Mercury, Venus, Mars', 'Venus, Mercury, Mars, Earth'], correct: 1 },
    { question: 'The Sun provides Earth with:', options: ['Only light', 'Only heat', 'Both heat and light energy', 'Water and air'], correct: 2 },
    { question: 'Why does the Moon appear to change shape throughout the month?', options: ['The Moon shrinks and grows', 'Clouds cover different parts', 'We see different amounts of its lit side as it orbits Earth', 'The Moon makes its own light in different amounts'], correct: 2 },
    { question: 'What force keeps planets orbiting around the Sun?', options: ['Magnetism', 'Friction', 'Gravity', 'Electricity'], correct: 2 },
    { question: 'In a solar oven, why is black paper used on the bottom?', options: ['To look nice', 'Black absorbs heat better than lighter colors', 'To reflect sunlight', 'To keep the food cold'], correct: 1 }
  ],
  'February': [
    { question: 'What four things must every habitat provide for animals?', options: ['Toys, beds, food, water', 'Food, water, shelter, and space', 'Trees, rocks, grass, sun', 'Warmth, cold, rain, snow'], correct: 1 },
    { question: 'In a food web, the Sun provides energy to:', options: ['Consumers', 'Decomposers', 'Producers (plants)', 'Predators'], correct: 2 },
    { question: 'What role do decomposers play in an ecosystem?', options: ['They make food from sunlight', 'They break down dead material into soil nutrients', 'They hunt other animals', 'They produce oxygen'], correct: 1 },
    { question: 'What can scientists learn from fossils?', options: ['Only what rocks look like', 'What organisms lived long ago and how environments changed', 'What the weather will be tomorrow', 'How tall modern humans are'], correct: 1 },
    { question: 'When oil spills in water, why is it so hard to clean up?', options: ['Oil dissolves in water', 'Oil floats on water and harms wildlife like birds and fish', 'Oil evaporates quickly', 'Oil sinks to the bottom'], correct: 1 }
  ],
  'March': [
    { question: 'A hummingbird has a long thin beak. This is an adaptation that helps it:', options: ['Crack open seeds', 'Reach nectar deep inside flowers', 'Catch fish', 'Dig holes in the ground'], correct: 1 },
    { question: 'An Arctic hare is white in winter. How does this help it survive?', options: ['It absorbs more heat', 'Camouflage helps it hide from predators in the snow', 'It looks prettier', 'White fur is warmer than brown fur'], correct: 1 },
    { question: 'Blubber helps marine mammals survive in freezing water by:', options: ['Making them swim faster', 'Insulating their bodies and trapping heat', 'Helping them see underwater', 'Making them float better'], correct: 1 },
    { question: 'An inherited trait is:', options: ['Something you learned to do', 'A characteristic passed from parent to child, like eye color', 'A skill you practiced a lot', 'A habit you developed'], correct: 1 },
    { question: 'What three things does a seed need to germinate?', options: ['Sunlight, soil, and fertilizer', 'Water, warmth, and oxygen', 'Music, water, and light', 'Sugar, air, and darkness'], correct: 1 }
  ],
  'April': [
    { question: 'How does water move up a plant stem against gravity?', options: ['Magic', 'Capillary action through tiny tubes called xylem', 'The leaves pull it up', 'Animals push it up'], correct: 1 },
    { question: 'What three ingredients does a plant need for photosynthesis?', options: ['Soil, water, and fertilizer', 'Sunlight, water, and carbon dioxide', 'Sugar, oxygen, and light', 'Rain, worms, and dirt'], correct: 1 },
    { question: 'Why do flowers have bright colors and sweet smells?', options: ['To look pretty in gardens', 'To attract pollinators like bees and butterflies', 'To scare away predators', 'To absorb more sunlight'], correct: 1 },
    { question: 'When you submerge a leaf in water and place it in sunlight, tiny bubbles form. These bubbles are:', options: ['Carbon dioxide', 'Oxygen produced by photosynthesis', 'Water vapor', 'Air from the environment'], correct: 1 },
    { question: 'What is the purpose of a plant\'s roots?', options: ['To make flowers', 'To absorb water and nutrients from soil and anchor the plant', 'To catch sunlight', 'To release oxygen'], correct: 1 }
  ],
  'May': [
    { question: 'Which shape is strongest for building structures like bridges?', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correct: 2 },
    { question: 'In an egg drop experiment, which design feature helps protect the egg?', options: ['Making it as heavy as possible', 'Cushioning that absorbs the impact force', 'Making it as small as possible', 'Painting it a bright color'], correct: 1 },
    { question: 'When building a tall tower, why is a wide base important?', options: ['It uses more materials', 'It makes the tower heavier', 'A wider base makes the structure more stable', 'It looks better'], correct: 2 },
    { question: 'In a water filter, which layer catches the largest particles first?', options: ['Cotton balls', 'Sand', 'Large rocks or gravel', 'Charcoal'], correct: 2 },
    { question: 'The engineering design process has five steps. What is the correct order?', options: ['Build, ask, test, plan, improve', 'Ask, imagine, plan, create, improve', 'Test, build, plan, ask, share', 'Imagine, create, ask, test, plan'], correct: 1 }
  ],
  'June': [
    { question: 'What are the three states of matter?', options: ['Hot, warm, and cold', 'Solid, liquid, and gas', 'Heavy, light, and medium', 'Hard, soft, and squishy'], correct: 1 },
    { question: 'In a food chain from the Sun to a top predator, the correct order is:', options: ['Predator, consumer, plant, Sun', 'Sun, producer, primary consumer, secondary consumer', 'Plant, Sun, herbivore, carnivore', 'Sun, animal, plant, decomposer'], correct: 1 },
    { question: 'What should a scientist do BEFORE conducting an experiment?', options: ['Start building right away', 'State a hypothesis (prediction)', 'Write the conclusion', 'Ask someone else to do it'], correct: 1 },
    { question: 'When presenting at a science fair, you should be able to explain:', options: ['Only the materials you used', 'The question, hypothesis, procedure, results, and conclusion', 'Only whether you liked the experiment', 'Just the title of your project'], correct: 1 },
    { question: 'What was your favorite science experiment this year?', options: ['Making Oobleck and ice cream', 'Building balloon rockets and bridges', 'Growing plants and studying animals', 'All of the above!'], correct: 3 }
  ]
},
'age-8-art': {
  'September': [
    { question: 'Which type of line might an artist use to show ANGER or excitement?', options: ['Smooth, wavy lines', 'Jagged, zigzag lines', 'Straight horizontal lines', 'Dotted lines'], correct: 1 },
    { question: 'What is the difference between geometric and organic shapes?', options: ['Geometric shapes are 3D and organic shapes are 2D', 'Geometric shapes have precise edges; organic shapes are freeform and flowing', 'Organic shapes are only found in math', 'There is no difference'], correct: 1 },
    { question: 'When you mix red and blue paint together, what color do you get?', options: ['Green', 'Orange', 'Purple', 'Yellow'], correct: 2 },
    { question: 'Which colors are considered WARM colors?', options: ['Blue, green, purple', 'Red, orange, yellow', 'Black, white, gray', 'Pink, blue, teal'], correct: 1 },
    { question: 'When you mix blue and yellow paint, what secondary color do you create?', options: ['Orange', 'Purple', 'Green', 'Red'], correct: 2 }
  ],
  'October': [
    { question: 'In blind contour drawing, you:', options: ['Draw without looking at the paper at all', 'Draw with your eyes closed', 'Trace a picture exactly', 'Draw only using circles'], correct: 0 },
    { question: 'What are the three shading techniques you can use to make a drawing look 3D?', options: ['Coloring, painting, erasing', 'Hatching, cross-hatching, and blending', 'Outlining, filling, and shading', 'Sketching, tracing, and copying'], correct: 1 },
    { question: 'When objects are partially hidden behind others in a still life drawing, this is called:', options: ['Shadowing', 'Overlapping', 'Blending', 'Outlining'], correct: 1 },
    { question: 'A gesture drawing is a quick sketch that captures:', options: ['Every tiny detail', 'The MOVEMENT and energy of a figure', 'Only the face', 'The colors of a scene'], correct: 1 },
    { question: 'When drawing a person in motion, it helps to first sketch a:', options: ['Detailed face', 'Stick figure skeleton and then add shapes', 'Background scene', 'Shadow only'], correct: 1 }
  ],
  'November': [
    { question: 'In watercolor painting, a "wet-on-wet" technique means:', options: ['Painting on dry paper', 'Adding wet paint to paper that is already wet with water', 'Using only a dry brush', 'Painting two pictures at once'], correct: 1 },
    { question: 'What happens when you sprinkle salt on wet watercolor paint?', options: ['Nothing happens', 'The salt absorbs pigment and creates starburst-like texture patterns', 'The paint changes color', 'The paper rips'], correct: 1 },
    { question: 'A "dry brush" technique creates what effect?', options: ['Smooth, even color', 'A textured, scratchy mark good for things like tree bark', 'A perfect circle', 'A very dark black line'], correct: 1 },
    { question: 'Before painting an object from observation, you should first:', options: ['Start painting immediately', 'Spend 3 full minutes just LOOKING at the object', 'Close your eyes and imagine it', 'Ask someone else to paint it'], correct: 1 },
    { question: 'Tempera paint is described as:', options: ['Transparent like watercolor', 'Opaque and forgiving, good for learning brush control', 'Permanent and cannot be fixed', 'Only used by professional artists'], correct: 1 }
  ],
  'December': [
    { question: 'In clay hand-building, a "pinch pot" is made by:', options: ['Rolling clay into a flat sheet', 'Pushing your thumb into a ball and pinching the walls thin', 'Stacking coils of clay', 'Pouring clay into a mold'], correct: 1 },
    { question: 'When doing paper mache, why should you tear newspaper instead of cutting it?', options: ['It is faster', 'Torn edges blend together more smoothly', 'Cut paper does not stick', 'It uses less paper'], correct: 1 },
    { question: 'In origami, a "valley fold" means:', options: ['Folding the paper so it forms a peak pointing up', 'Folding the paper so it forms a valley shape going down', 'Rolling the paper into a tube', 'Cutting the paper in half'], correct: 1 },
    { question: 'A "found object sculpture" is made from:', options: ['Only clay and paint', 'Everyday recycled and natural materials', 'Only expensive art supplies', 'Only wooden blocks'], correct: 1 },
    { question: 'When building a sculpture, what three things should you think about?', options: ['Color, price, and size', 'Texture, balance, and form', 'Speed, height, and weight', 'Taste, smell, and sound'], correct: 1 }
  ],
  'January': [
    { question: 'How many beats does a quarter note get?', options: ['1 beat', '2 beats', '4 beats', 'Half a beat'], correct: 0 },
    { question: 'What does the musical term "forte" mean?', options: ['Very slow', 'Soft', 'Loud', 'Fast'], correct: 2 },
    { question: 'In the treble clef, the notes on the LINES from bottom to top spell:', options: ['FACE', 'EGBDF (Every Good Boy Does Fine)', 'ABCDEFG', 'GBDFAC'], correct: 1 },
    { question: 'What three homemade instruments can you build from household items?', options: ['Guitar, piano, violin', 'Shaker, drum, and guiro', 'Trumpet, flute, and cello', 'Harp, saxophone, and tuba'], correct: 1 },
    { question: 'What does "allegro" mean in music?', options: ['Very slow', 'Walking speed', 'Fast', 'Very soft'], correct: 2 }
  ],
  'February': [
    { question: 'Aboriginal dot painting comes from which country?', options: ['Japan', 'Mexico', 'Australia', 'Ghana'], correct: 2 },
    { question: 'In Japanese sumi-e painting, what is the concept of "ma"?', options: ['A type of brush stroke', 'The intentional use of empty/white space', 'A type of black ink', 'A flower pattern'], correct: 1 },
    { question: 'Kente cloth is a traditional textile from which country?', options: ['Japan', 'Ghana', 'Mexico', 'Australia'], correct: 1 },
    { question: 'Papel picado is a Mexican folk art that involves:', options: ['Painting on clay pots', 'Cutting intricate designs into tissue paper', 'Weaving colorful threads', 'Carving wooden masks'], correct: 1 },
    { question: 'When learning about art from other cultures, what is most important?', options: ['Copying it exactly', 'Respecting and honoring the cultural traditions', 'Making fun of it', 'Changing it completely'], correct: 1 }
  ],
  'March': [
    { question: 'When creating a character for drama, what three things help make the character believable?', options: ['Costume, makeup, and props', 'Voice, body language, and facial expressions', 'Height, weight, and age', 'Reading, writing, and drawing'], correct: 1 },
    { question: 'The #1 rule of improvisation is "Yes, And," which means:', options: ['Always say yes to snacks', 'Accept what your partner says and add to it', 'Interrupt whenever you want', 'Disagree with everything'], correct: 1 },
    { question: 'In Reader\'s Theater, performers:', options: ['Memorize all their lines and wear full costumes', 'Read from a script with expression but no full costumes', 'Do not use any voices or expression', 'Only read the narration'], correct: 1 },
    { question: 'When making a sock puppet, the mouth is created by:', options: ['Gluing felt to the outside', 'Tucking the toe area between your fingers and thumb', 'Cutting a hole in the sock', 'Drawing it with marker'], correct: 1 },
    { question: 'Before performing, actors should warm up their:', options: ['Only their hands', 'Voices, bodies, and facial muscles', 'Only their feet', 'Only their memory'], correct: 1 }
  ],
  'April': [
    { question: 'A collage is an artwork made by:', options: ['Painting one smooth layer of color', 'Gluing pieces of paper, fabric, or materials onto a surface', 'Drawing with only a pencil', 'Carving into wood'], correct: 1 },
    { question: 'In relief printing, what is "positive space"?', options: ['The carved-away parts that stay blank', 'The inked raised part that prints on the paper', 'The paper itself', 'The area outside the stamp'], correct: 1 },
    { question: 'What makes a mono-print special compared to other types of prints?', options: ['It uses only one color', 'It can only be made once and cannot be exactly repeated', 'It takes one minute to make', 'It is always black and white'], correct: 1 },
    { question: 'Which artist was famous for his collage illustrations in "The Very Hungry Caterpillar"?', options: ['Pablo Picasso', 'Eric Carle', 'Claude Monet', 'Frida Kahlo'], correct: 1 },
    { question: 'Creating art from recycled materials is one way to:', options: ['Save money on art supplies', 'Care for the environment by reusing materials', 'Make art look messy on purpose', 'Practice cutting skills'], correct: 1 }
  ],
  'May': [
    { question: 'Claude Monet was famous for painting:', options: ['Portraits with geometric shapes', 'Water lilies using short, visible brush strokes', 'Skulls and desert landscapes', 'Self-portraits with symbols'], correct: 1 },
    { question: 'Cubism, created by Pablo Picasso, shows objects:', options: ['Exactly as they look in real life', 'Broken into geometric shapes from multiple viewpoints at once', 'Using only one color', 'As photographs'], correct: 1 },
    { question: 'Frida Kahlo included personal symbols in her self-portraits to:', options: ['Make the paintings longer', 'Express her feelings, dreams, and personal story', 'Make them look like other artists\' work', 'Hide her face'], correct: 1 },
    { question: 'Georgia O\'Keeffe was famous for painting flowers:', options: ['Very small in the corner of the canvas', 'So large and close-up that they fill the entire canvas', 'Only in black and white', 'With geometric cubist shapes'], correct: 1 },
    { question: 'Which artistic movement focused on capturing light and atmosphere with short brush strokes?', options: ['Cubism', 'Impressionism', 'Abstract art', 'Pop art'], correct: 1 }
  ],
  'June': [
    { question: 'When selecting pieces for your art portfolio, you should choose works that:', options: ['Are all the same color', 'Show your best work, favorites, and biggest improvements', 'Were all finished in one day', 'Are all paintings'], correct: 1 },
    { question: 'A "curator" is the person who:', options: ['Cleans the art gallery', 'Decides how artwork is displayed and organized in an exhibition', 'Sells art supplies', 'Paints the gallery walls'], correct: 1 },
    { question: 'When working on a collaborative mural, the most important skills are:', options: ['Being the fastest painter', 'Teamwork, communication, and compromise', 'Using only your favorite colors', 'Working alone'], correct: 1 },
    { question: 'At the end-of-year Creative Celebration, you can showcase skills from:', options: ['Only painting', 'Only music', 'Drama, music, movement, and art combined', 'Only drawing'], correct: 2 },
    { question: 'What was your favorite art activity this year?', options: ['Painting and sculpture', 'Music and drama', 'World art and famous artists', 'All of the above!'], correct: 3 }
  ]
}
,

'age-9-math': {
  'September': [
    { question: 'In the number 4,382,671, what is the value of the digit 8?', options: ['8', '80,000', '800', '8,000'], correct: 1 },
    { question: 'A digit in one place represents ten times what it represents in the place to its right. If the digit 3 is in the thousands place, what value does it have in the ten thousands place?', options: ['300', '30,000', '3,000', '300,000'], correct: 1 },
    { question: 'Round 847,293 to the nearest ten thousand. Which digit do you look at to make the decision?', options: ['The 4', 'The 7', 'The 2', 'The 9'], correct: 2 },
    { question: 'Solve 10,003 - 4,678. What is the answer?', options: ['5,325', '6,325', '5,425', '6,425'], correct: 0 },
    { question: 'Using the area model to multiply 23 x 4, you decompose 23 into 20 and 3. What are the two partial products?', options: ['80 and 12', '60 and 8', '90 and 3', '70 and 20'], correct: 0 }
  ],
  'October': [
    { question: 'What does the denominator of a fraction tell you?', options: ['How many parts you have', 'How many equal parts make the whole', 'The total value', 'How much is left'], correct: 1 },
    { question: 'Which fraction is equivalent to 1/2?', options: ['2/6', '3/5', '4/8', '3/6'], correct: 2 },
    { question: 'Compare 3/5 and 5/8 using a common denominator of 40. Which is larger?', options: ['3/5 is larger', '5/8 is larger', 'They are equal', 'Cannot be compared'], correct: 1 },
    { question: 'On a number line partitioned into sixths, where does 7/6 fall?', options: ['Before zero', 'Between 0 and 1', 'Between 1 and 2', 'Exactly at 1'], correct: 2 },
    { question: 'Decompose 5/6 into a sum of unit fractions. Which is a correct decomposition?', options: ['1/6 + 1/6 + 1/6 + 1/6 + 1/6', '5/6 + 0', '6/6 - 1/6', '1/5 + 1/5 + 1/5 + 1/5 + 1/5'], correct: 0 }
  ],
  'November': [
    { question: 'When adding fractions with like denominators, what stays the same?', options: ['The numerator', 'The denominator', 'Both change', 'Neither exists'], correct: 1 },
    { question: 'Solve: 7/10 - 3/10 = ?', options: ['4/20', '4/10', '2/5', 'Both 4/10 and 2/5 are correct'], correct: 3 },
    { question: 'Add the mixed numbers 3 and 2/5 + 1 and 4/5. After regrouping, what is the final answer?', options: ['4 and 6/5', '5 and 1/5', '4 and 1/5', '6 and 1/5'], correct: 1 },
    { question: 'Solve 6 x 3/8. What is the result as a mixed number?', options: ['18/8', '2 and 1/4', '2 and 2/8', 'All of these represent the same value'], correct: 3 },
    { question: 'A recipe calls for 3/4 cup of sugar. You need to make 3 times the recipe. How much sugar do you need?', options: ['1 and 1/4 cups', '9/4 cups', '2 and 1/4 cups', 'All of these represent the same amount'], correct: 3 }
  ],
  'December': [
    { question: 'What decimal is equivalent to the fraction 3/10?', options: ['0.03', '0.3', '3.0', '0.13'], correct: 1 },
    { question: 'How is 37/100 written as a decimal?', options: ['0.037', '3.7', '0.37', '37.0'], correct: 2 },
    { question: 'Which is larger: 0.6 or 0.58?', options: ['0.58 is larger', '0.6 is larger', 'They are equal', 'Cannot be determined'], correct: 1 },
    { question: 'You buy a book for $4.85 and pay with a $10 bill. How much change do you receive?', options: ['$5.15', '$6.15', '$5.25', '$4.15'], correct: 0 },
    { question: 'Why does 0.4 = 0.40?', options: ['Because 4 and 40 are the same number', 'Because 4/10 = 40/100, they represent the same amount', 'Decimals cannot have two digits after the point', 'It is a rounding error'], correct: 1 }
  ],
  'January': [
    { question: 'Using an area model for 24 x 13, you decompose 24 into 20+4 and 13 into 10+3. What are the four partial products?', options: ['200, 60, 40, 12', '240, 13, 20, 4', '34, 37, 24, 13', '200, 30, 40, 12'], correct: 0 },
    { question: 'Solve 67 x 38 using the standard algorithm. What is the product?', options: ['2,546', '2,456', '2,646', '2,446'], correct: 0 },
    { question: 'Solve 5,672 / 8. What is the quotient?', options: ['709', '719', '699', '790'], correct: 0 },
    { question: 'A school has 186 students going on a field trip. Each bus holds 45 students. How many buses are needed?', options: ['4 buses', '5 buses', '3 buses', '6 buses'], correct: 1 },
    { question: 'When using long division (DMSB), what does the M stand for?', options: ['Move', 'Multiply', 'Measure', 'Minimize'], correct: 1 }
  ],
  'February': [
    { question: 'What is the difference between a line and a line segment?', options: ['A line has two endpoints, a segment extends forever', 'A line extends infinitely in both directions, a segment has two endpoints', 'They are the same thing', 'A line is curved, a segment is straight'], correct: 1 },
    { question: 'A square is also classified as which of the following?', options: ['Only a rhombus', 'Only a rectangle', 'Both a rectangle and a rhombus', 'Neither a rectangle nor a rhombus'], correct: 2 },
    { question: 'How many lines of symmetry does a rectangle have?', options: ['1', '4', '2', '0'], correct: 2 },
    { question: 'What type of angle measures exactly 90 degrees?', options: ['Acute', 'Obtuse', 'Straight', 'Right'], correct: 3 },
    { question: 'Two angles combine to form a straight angle (180 degrees). If one angle is 72 degrees, what is the other?', options: ['108 degrees', '98 degrees', '118 degrees', '72 degrees'], correct: 0 }
  ],
  'March': [
    { question: 'Convert 3 yards to inches. (1 yard = 3 feet, 1 foot = 12 inches)', options: ['36 inches', '108 inches', '48 inches', '72 inches'], correct: 1 },
    { question: 'A rectangular garden has a perimeter of 42 meters and a length of 12 meters. What is the width?', options: ['9 meters', '15 meters', '30 meters', '6 meters'], correct: 0 },
    { question: 'On a line plot showing pencil lengths measured in quarter inches, what does each X represent?', options: ['One quarter inch', 'One pencil measurement', 'Four pencils', 'A category label'], correct: 1 },
    { question: 'The three angles of a triangle always add up to what measurement?', options: ['360 degrees', '270 degrees', '90 degrees', '180 degrees'], correct: 3 },
    { question: 'How many milliliters are in 4 liters?', options: ['400 mL', '40 mL', '4,000 mL', '40,000 mL'], correct: 2 }
  ],
  'April': [
    { question: 'Find all factor pairs of 60. Which of these is a factor pair?', options: ['7 and 8', '5 and 12', '4 and 16', '3 and 25'], correct: 1 },
    { question: 'Which of the following is a prime number?', options: ['51', '43', '49', '57'], correct: 1 },
    { question: 'In the pattern starting at 7 and adding 4 each time (7, 11, 15, 19...), will the number 99 ever appear?', options: ['No, because 99 is too large', 'Yes, because 7 + 4x23 = 99', 'No, because 99 is odd', 'Yes, because all odd numbers appear'], correct: 1 },
    { question: 'If n x 6 = 42, what is n?', options: ['6', '7', '8', '36'], correct: 1 },
    { question: 'A prime number has exactly how many factors?', options: ['One', 'Three', 'Two', 'Four'], correct: 2 }
  ],
  'May': [
    { question: 'A school bus holds 48 students. 352 students are going on a field trip. Each bus costs $275. Is a $2,000 budget enough?', options: ['Yes, with money left over', 'No, you need $2,200 total', 'No, you need $1,925 total', 'Yes, exactly $2,000'], correct: 0 },
    { question: 'In a CER math explanation, what does CER stand for?', options: ['Calculate, Estimate, Round', 'Claim, Evidence, Reasoning', 'Compare, Explain, Repeat', 'Check, Evaluate, Record'], correct: 1 },
    { question: 'Which fraction is larger: 5/6 or 7/8?', options: ['5/6 is larger', '7/8 is larger', 'They are equal', 'Cannot be compared'], correct: 1 },
    { question: 'When designing a dream bedroom on graph paper where 1 square = 1 foot, a room of 12 ft x 14 ft has what area?', options: ['26 sq ft', '52 sq ft', '168 sq ft', '144 sq ft'], correct: 2 },
    { question: 'A 5-step problem-solving framework starts with "Understand." What is the last step?', options: ['Check', 'Plan', 'Solve', 'Communicate'], correct: 3 }
  ],
  'June': [
    { question: 'Which topic was studied in October during math this year?', options: ['Place Value', 'Fractions', 'Geometry', 'Decimals'], correct: 1 },
    { question: 'In a Math Carnival review, the Fraction Pizza Station asks you to assemble toppings. What fraction operation does this practice?', options: ['Division', 'Multiplication', 'Addition', 'All fraction skills'], correct: 3 },
    { question: 'Which test-taking strategy helps when you get stuck on a problem?', options: ['Skip it and come back later', 'Guess immediately', 'Leave it blank', 'Erase all your work'], correct: 0 },
    { question: 'A good math portfolio should include which of the following?', options: ['Only your best test scores', 'Samples showing growth across the year', 'Only your favorite topic', 'Only the easiest assignments'], correct: 1 },
    { question: 'What was the best part of Grade 4 math?', options: ['Learning about fractions and decimals', 'Building geometry cities and dream bedrooms', 'Discovering prime numbers and patterns', 'All of the above!'], correct: 3 }
  ]
},
'age-9-english': {
  'September': [
    { question: 'What is the Five Finger Rule used for?', options: ['Counting syllables', 'Checking if a book is at the right reading level', 'Learning to type', 'Memorizing spelling words'], correct: 1 },
    { question: 'Which story element answers the question "where and when does the story take place"?', options: ['Characters', 'Plot', 'Setting', 'Theme'], correct: 2 },
    { question: 'In personal narrative writing, what is a "seed" moment?', options: ['A story about planting seeds', 'A big topic like "My Summer Vacation"', 'A small, specific moment within a larger experience', 'A fictional adventure story'], correct: 2 },
    { question: 'A reading response using Text-to-Self means what?', options: ['Comparing the text to another book', 'Connecting the text to your own life experience', 'Connecting the text to a world event', 'Summarizing the text word for word'], correct: 1 },
    { question: 'Which sentence uses a sensory detail?', options: ['I walked to school.', 'The cold wind stung my cheeks.', 'It was a good day.', 'I like pizza.'], correct: 1 }
  ],
  'October': [
    { question: 'Which text feature helps you find the definition of a word in a nonfiction book?', options: ['Table of contents', 'Caption', 'Glossary', 'Index'], correct: 2 },
    { question: 'What is the difference between a topic and a main idea?', options: ['They are the same thing', 'A topic is what the text is about; a main idea is what the author is saying about that topic', 'A main idea is always the first sentence', 'A topic is longer than a main idea'], correct: 1 },
    { question: 'In Cornell Notes, what goes in the narrow left column?', options: ['Full sentences', 'Questions or keywords', 'Drawings', 'The date'], correct: 1 },
    { question: 'When researching with multiple sources, why should you cite your sources?', options: ['To make your writing longer', 'To show where your information came from and give credit', 'Because the teacher said so', 'It is only needed in high school'], correct: 1 },
    { question: 'Which of these is an example of a nonfiction text feature?', options: ['Rhyming words', 'A labeled diagram', 'A fictional character', 'Dialogue between characters'], correct: 1 }
  ],
  'November': [
    { question: 'What does the OREO method stand for in opinion writing?', options: ['Open, Read, Explain, Observe', 'Opinion, Reason, Example, Opinion', 'Organize, Revise, Edit, Outline', 'Observe, Reflect, Express, Offer'], correct: 1 },
    { question: 'What is the difference between a fact and an opinion?', options: ['Facts are always longer', 'Facts can be proven; opinions are beliefs or feelings', 'Opinions are always true', 'There is no difference'], correct: 1 },
    { question: 'Which persuasive technique uses words that make the reader feel something?', options: ['Strong word choice', 'Expert opinion', 'Appeal to emotion', 'Statistics'], correct: 2 },
    { question: 'In a 5-paragraph opinion essay, what does the introduction need?', options: ['A hook and a thesis statement', 'Three reasons', 'A conclusion', 'A counterargument'], correct: 0 },
    { question: 'What is a counterargument?', options: ['A second opinion essay', 'Addressing the opposing viewpoint in your writing', 'An argument you had with a friend', 'The last paragraph of any essay'], correct: 1 }
  ],
  'December': [
    { question: 'A haiku follows what syllable pattern?', options: ['5-5-5', '5-7-5', '7-5-7', '3-5-3'], correct: 1 },
    { question: 'What is the difference between a simile and a metaphor?', options: ['Similes are longer than metaphors', 'Similes use "like" or "as"; metaphors say something IS something else', 'Metaphors are only used in poetry', 'There is no difference'], correct: 1 },
    { question: '"The wind whispered through the trees" is an example of which figurative language?', options: ['Simile', 'Onomatopoeia', 'Personification', 'Alliteration'], correct: 2 },
    { question: 'Which of these words is an example of onomatopoeia?', options: ['Quietly', 'Buzz', 'Beautiful', 'Walking'], correct: 1 },
    { question: '"Seven silly sisters sang songs" is an example of which technique?', options: ['Personification', 'Simile', 'Metaphor', 'Alliteration'], correct: 3 }
  ],
  'January': [
    { question: '"Go get the ball." What type of sentence is this?', options: ['Declarative', 'Interrogative', 'Imperative', 'Exclamatory'], correct: 2 },
    { question: 'Which part of speech describes a verb and often ends in -ly?', options: ['Noun', 'Adjective', 'Preposition', 'Adverb'], correct: 3 },
    { question: 'When writing dialogue, what should you do each time a new person speaks?', options: ['Use a new font', 'Start a new paragraph', 'Add a semicolon', 'Nothing special'], correct: 1 },
    { question: 'Which spelling rule applies to "believe" but not "receive"?', options: ['I before E except after C', 'Add -s for plurals', 'Drop the silent E', 'Double the consonant'], correct: 0 },
    { question: '"It\'s" always means what?', options: ['Possession', '"It is" or "it has"', 'More than one it', 'The opposite of "it"'], correct: 1 }
  ],
  'February': [
    { question: 'In the Hamburger Model for expository writing, what does the "top bun" represent?', options: ['The conclusion', 'The introduction with a hook and thesis', 'The body paragraphs', 'The bibliography'], correct: 1 },
    { question: 'What signal word indicates a comparison?', options: ['However', 'Similarly', 'Therefore', 'Because'], correct: 1 },
    { question: 'A cause-and-effect paragraph about a volcano erupting would most likely use which structure?', options: ['One cause leading to multiple effects', 'Chronological order', 'Compare and contrast', 'Problem and solution'], correct: 0 },
    { question: 'Which of these is an academic vocabulary word for Grade 4?', options: ['Fun', 'Nice', 'Evidence', 'Big'], correct: 2 },
    { question: 'What is the Point-by-Point method used for?', options: ['Writing poetry', 'Organizing a compare/contrast essay by discussing one aspect of both topics in each paragraph', 'Taking notes from a video', 'Memorizing spelling words'], correct: 1 }
  ],
  'March': [
    { question: 'What does the acronym STEAL help you analyze?', options: ['Spelling, Grammar, Punctuation', 'How an author reveals character traits through Speech, Thoughts, Effects, Actions, Looks', 'The setting of a story', 'The theme of a novel'], correct: 1 },
    { question: 'What is the difference between theme and main idea?', options: ['They are the same', 'Theme is the universal lesson; main idea is what the text is specifically about', 'Main idea is always stated at the end', 'Theme is only found in fiction'], correct: 1 },
    { question: 'A narrator who uses "I, me, my" is telling the story from which point of view?', options: ['Third person omniscient', 'Second person', 'Third person limited', 'First person'], correct: 3 },
    { question: 'When comparing a book to its movie adaptation, why do filmmakers often make changes?', options: ['Because they do not like books', 'For time constraints, visual storytelling, and dramatic effect', 'To make the story worse', 'They are required to by law'], correct: 1 },
    { question: 'Which point of view uses "you" and speaks directly to the reader?', options: ['First person', 'Third person limited', 'Second person', 'Third person omniscient'], correct: 2 }
  ],
  'April': [
    { question: 'The Greek/Latin root "hydro" means what?', options: ['Earth', 'Water', 'Sound', 'Life'], correct: 1 },
    { question: 'Read the sentence: "The arid desert, a dry and sandy place, stretched for miles." What type of context clue is used for "arid"?', options: ['Synonym clue', 'Antonym clue', 'Definition clue', 'Example clue'], correct: 2 },
    { question: 'Which sentence correctly uses the word "bank"?', options: ['I sat on the river bank and deposited money in the river bank.', 'I deposited money in the bank and watched the fish swim by the river bank.', 'The bank was too tall to climb.', 'Bank is always a financial institution.'], correct: 1 },
    { question: 'What do guide words at the top of a dictionary page help you do?', options: ['Pronounce words', 'Quickly determine if your word is on that page', 'Find synonyms', 'Understand word origins'], correct: 1 },
    { question: 'The root "graph" means "write or draw." Which word contains this root?', options: ['Geography', 'Telephone', 'Biology', 'Transport'], correct: 0 }
  ],
  'May': [
    { question: 'When writing dialogue, what punctuation goes around the spoken words?', options: ['Parentheses', 'Quotation marks', 'Brackets', 'Asterisks'], correct: 1 },
    { question: '"Sarah stared at the floor. Her shoulders slumped and a single tear rolled down her cheek." This is an example of what technique?', options: ['Telling', 'Onomatopoeia', 'Show Don\'t Tell', 'Alliteration'], correct: 2 },
    { question: 'In the ARMS revision strategy, what does the R stand for?', options: ['Rewrite', 'Remove unnecessary words or ideas', 'Read', 'Replace verbs'], correct: 1 },
    { question: 'What does the CUPS editing strategy check for?', options: ['Content, Understanding, Purpose, Style', 'Capitalization, Usage, Punctuation, Spelling', 'Clarity, Unity, Precision, Sound', 'Creativity, Uniqueness, Polish, Success'], correct: 1 },
    { question: 'What is an "Author\'s Chair" event?', options: ['Sitting in the principal\'s office', 'Reading your published writing aloud to an audience', 'Writing in a special notebook', 'A type of desk arrangement'], correct: 1 }
  ],
  'June': [
    { question: 'A good writing portfolio should include what?', options: ['Only your best test scores', 'Pieces from different genres that show growth over time', 'Only stories you wrote', 'Only assignments the teacher graded'], correct: 1 },
    { question: 'When setting summer reading goals, what makes a goal effective?', options: ['It should be very easy', 'It should be specific and measurable', 'It should be about the longest book possible', 'Goals are not important'], correct: 1 },
    { question: 'The 3 Ps of public speaking are Posture, Projection, and what?', options: ['Punctuation', 'Pacing', 'Preparation', 'Pronunciation'], correct: 1 },
    { question: 'What should a "Future Self" letter to your Grade 5 self include?', options: ['Advice, goals, and encouragement', 'Only complaints about Grade 4', 'A list of all your test scores', 'Your phone number'], correct: 0 },
    { question: 'What was the most valuable skill you developed in Grade 4 English?', options: ['Writing persuasive essays using the OREO method', 'Using figurative language in poetry and stories', 'Researching topics with multiple sources', 'All of the above!'], correct: 3 }
  ]
},
'age-9-science': {
  'September': [
    { question: 'What are the five main forms of energy studied this month?', options: ['Kinetic, potential, thermal, electrical, light', 'Solar, lunar, tidal, wind, water', 'Fast, slow, hot, cold, bright', 'Nuclear, chemical, magnetic, sound, gravity'], correct: 0 },
    { question: 'In a collision between a marble and a plastic cup, what happens if you use a heavier ball?', options: ['The cup slides less', 'The cup slides the same distance', 'The cup slides farther because more energy is transferred', 'Nothing happens'], correct: 2 },
    { question: 'The Law of Conservation of Energy states that energy cannot be created or destroyed, only what?', options: ['Lost', 'Stored', 'Changed from one form to another', 'Made bigger'], correct: 2 },
    { question: 'What causes sound?', options: ['Light waves', 'Vibrations', 'Heat', 'Gravity'], correct: 1 },
    { question: 'In a flashlight, what is the energy transformation chain?', options: ['Light -> Electrical -> Chemical', 'Chemical -> Electrical -> Light (and some heat)', 'Electrical -> Chemical -> Light', 'Thermal -> Light -> Chemical'], correct: 1 }
  ],
  'October': [
    { question: 'What causes static electricity?', options: ['Heat transfer', 'Electrons being transferred between objects through rubbing', 'Water evaporation', 'Magnetic fields'], correct: 1 },
    { question: 'What does a circuit need in order for electricity to flow?', options: ['A switch only', 'A complete closed loop', 'A battery only', 'An open gap'], correct: 1 },
    { question: 'Which material is a good conductor of electricity?', options: ['Rubber', 'Plastic', 'Metal paperclip', 'Wood'], correct: 2 },
    { question: 'How can you make an electromagnet stronger?', options: ['Use fewer wire wraps', 'Use a plastic nail instead of iron', 'Increase the number of wire wraps around the nail', 'Remove the battery'], correct: 2 },
    { question: 'What happens when you disconnect the battery from an electromagnet?', options: ['It becomes a permanent magnet', 'The paperclips fall off because the magnetism stops', 'It gets stronger', 'Nothing changes'], correct: 1 }
  ],
  'November': [
    { question: 'What does the amplitude of a wave tell you?', options: ['How fast it travels', 'How much energy it carries', 'Its color', 'Its direction'], correct: 1 },
    { question: 'If a guitar string vibrates faster, what happens to the pitch?', options: ['The pitch gets higher', 'The pitch gets lower', 'The pitch stays the same', 'The sound stops'], correct: 0 },
    { question: 'What is refraction?', options: ['Light bouncing off a mirror', 'Light bending when it passes through a different material', 'Light being blocked by an object', 'Light creating a shadow'], correct: 1 },
    { question: 'Morse code uses patterns of short and long signals to send messages. What does this demonstrate?', options: ['Sound cannot travel through solids', 'Waves and patterns can carry information', 'Light is faster than sound', 'Electricity is dangerous'], correct: 1 },
    { question: 'A pencil appears to bend when placed in a glass of water. Which phenomenon causes this?', options: ['Reflection', 'Refraction', 'Shadowing', 'Absorption'], correct: 1 }
  ],
  'December': [
    { question: 'What is the difference between weathering and erosion?', options: ['They are the same process', 'Weathering breaks rocks in place; erosion moves the pieces elsewhere', 'Erosion only happens in deserts', 'Weathering only happens with wind'], correct: 1 },
    { question: 'What are the three types of rocks?', options: ['Hard, soft, medium', 'Igneous, sedimentary, metamorphic', 'Crystal, gem, mineral', 'Volcanic, oceanic, continental'], correct: 1 },
    { question: 'How do most fossils form?', options: ['Animals bury themselves', 'Sediment covers dead organisms and minerals replace bone material over millions of years', 'Rocks magically turn into bones', 'Fossils only form in volcanoes'], correct: 1 },
    { question: 'On a topographic map, what do closely spaced contour lines indicate?', options: ['Flat terrain', 'Gentle slopes', 'Steep terrain', 'Water'], correct: 2 },
    { question: 'In the crayon rock cycle model, what does melting the crayon represent?', options: ['Sedimentary rock forming', 'Igneous rock forming from melted material', 'Metamorphic rock forming from heat and pressure', 'Weathering of rocks'], correct: 1 }
  ],
  'January': [
    { question: 'What are the four stages of the water cycle in order?', options: ['Precipitation, evaporation, condensation, collection', 'Evaporation, condensation, precipitation, collection', 'Collection, precipitation, evaporation, condensation', 'Condensation, precipitation, collection, evaporation'], correct: 1 },
    { question: 'What is an aquifer?', options: ['A type of cloud', 'An underground layer that holds groundwater', 'A water treatment plant', 'A type of rain gauge'], correct: 1 },
    { question: 'Why is ocean water salty while rivers are not?', options: ['Rivers filter out salt', 'Ocean salt comes from minerals dissolved from land over millions of years', 'Fish add salt to the ocean', 'Rain is salty over oceans'], correct: 1 },
    { question: 'What is the difference between weather and climate?', options: ['They are the same', 'Weather is short-term conditions; climate is long-term patterns', 'Climate changes daily; weather stays the same', 'Weather is about rain; climate is about temperature'], correct: 1 },
    { question: 'Which type of cloud looks like fluffy cotton balls and usually means fair weather?', options: ['Stratus', 'Cirrus', 'Cumulus', 'Nimbus'], correct: 2 }
  ],
  'February': [
    { question: 'What are the four main parts of a flowering plant?', options: ['Roots, stems, leaves, flowers', 'Seeds, bark, petals, dirt', 'Branches, fruit, water, sunlight', 'Chlorophyll, pollen, nectar, roots'], correct: 0 },
    { question: 'What are the three ingredients plants need for photosynthesis?', options: ['Sugar, oxygen, soil', 'Sunlight, water, carbon dioxide', 'Fertilizer, rain, insects', 'Light, dirt, sugar'], correct: 1 },
    { question: 'A cactus has spines instead of wide leaves. How is this an adaptation?', options: ['It helps the cactus attract pollinators', 'Spines reduce water loss and protect from animals in the desert', 'It helps the cactus grow faster', 'Spines help the cactus float on water'], correct: 1 },
    { question: 'What role do bees play in plant reproduction?', options: ['They eat the seeds', 'They transfer pollen between flowers, enabling pollination', 'They provide water to the roots', 'They scare away predators'], correct: 1 },
    { question: 'What gas do plants release during photosynthesis?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Helium'], correct: 2 }
  ],
  'March': [
    { question: 'Which animal has such powerful smell that it can follow a scent trail days old?', options: ['Eagle', 'Bloodhound', 'Bat', 'Catfish'], correct: 1 },
    { question: 'How do muscles work to move bones?', options: ['Muscles push bones', 'Muscles work in pairs -- one contracts while the other relaxes', 'Only one muscle is needed per bone', 'Muscles are not connected to bones'], correct: 1 },
    { question: 'A chameleon changing color to match its surroundings is an example of which adaptation?', options: ['Mimicry', 'Migration', 'Camouflage', 'Hibernation'], correct: 2 },
    { question: 'Which vertebrate group is warm-blooded, has feathers, and lays eggs?', options: ['Mammals', 'Reptiles', 'Fish', 'Birds'], correct: 3 },
    { question: 'What do all vertebrates have in common?', options: ['They all live on land', 'They all have backbones', 'They all have fur', 'They all lay eggs'], correct: 1 }
  ],
  'April': [
    { question: 'What is the correct order of the Engineering Design Process?', options: ['Build, Test, Ask, Improve', 'Ask, Imagine, Plan, Create, Test, Improve', 'Plan, Create, Ask, Test', 'Test, Improve, Ask, Build'], correct: 1 },
    { question: 'What is the difference between criteria and constraints in engineering?', options: ['Criteria are limits; constraints are goals', 'Criteria are requirements for success; constraints are limits on materials, time, or budget', 'They mean the same thing', 'Criteria are only for bridges'], correct: 1 },
    { question: 'When brainstorming, what is the most important rule?', options: ['Only share perfect ideas', 'No criticism -- every idea is welcome, quantity over quality at first', 'Only the smartest person speaks', 'Wait until you have exactly one idea'], correct: 1 },
    { question: 'What is a prototype?', options: ['A final product sold in stores', 'A first version built to be tested, not perfected', 'A drawing on paper', 'A type of building material'], correct: 1 },
    { question: 'Why is failure during testing considered valuable in engineering?', options: ['It means you should quit', 'Failure is data that helps you improve your design', 'Engineers never fail', 'It only happens to beginners'], correct: 1 }
  ],
  'May': [
    { question: 'Which of these is a renewable resource?', options: ['Coal', 'Oil', 'Sunlight', 'Natural gas'], correct: 2 },
    { question: 'What environmental problem is caused by burning fossil fuels?', options: ['Cleaner air', 'Increased CO2 emissions contributing to climate change', 'More plant growth', 'Colder temperatures'], correct: 1 },
    { question: 'What does "sustainability" mean?', options: ['Using resources as fast as possible', 'Using resources at a rate that can be maintained long-term without depleting them', 'Only using solar power', 'Never using any resources'], correct: 1 },
    { question: 'A home energy audit involves what?', options: ['Paying more for electricity', 'Inspecting your home to find where energy is being wasted', 'Turning off all lights permanently', 'Buying new appliances'], correct: 1 },
    { question: 'Which energy source produces no air pollution during use but can affect birds?', options: ['Coal', 'Wind power', 'Oil', 'Natural gas'], correct: 1 }
  ],
  'June': [
    { question: 'A good scientific question must be what?', options: ['Very long', 'Testable through an experiment', 'About space', 'Answered with yes or no'], correct: 1 },
    { question: 'In an experiment, what is the independent variable?', options: ['What you measure', 'What you keep the same', 'What you change on purpose', 'The hypothesis'], correct: 2 },
    { question: 'Why should you do at least 3 trials in an experiment?', options: ['To make it take longer', 'For reliability -- to make sure results are consistent', 'Because one trial is always wrong', 'Only professional scientists need trials'], correct: 1 },
    { question: 'What should the conclusion of a science project state?', options: ['Only the hypothesis', 'Whether the hypothesis was supported or not, based on the data', 'What you plan to do next summer', 'A list of materials'], correct: 1 },
    { question: 'What was the most exciting thing you learned in Grade 4 science?', options: ['Building circuits and electromagnets', 'Discovering how energy transfers and waves carry information', 'Designing engineering solutions to real problems', 'All of the above!'], correct: 3 }
  ]
},
'age-9-art': {
  'September': [
    { question: 'In blind contour drawing, what is the main goal?', options: ['To make a perfect drawing', 'To train your eye to observe edges carefully without looking at the paper', 'To draw as fast as possible', 'To use only straight lines'], correct: 1 },
    { question: 'What is the difference between hatching and cross-hatching?', options: ['Hatching uses dots; cross-hatching uses lines', 'Hatching uses parallel lines; cross-hatching uses overlapping sets of parallel lines', 'They are the same technique', 'Cross-hatching is only for painting'], correct: 1 },
    { question: 'Which fitness test measures flexibility by reaching past your toes?', options: ['Push-ups', 'Curl-ups', 'Sit-and-reach', 'Timed run'], correct: 2 },
    { question: 'Proper running form includes which of the following?', options: ['Landing on your heels', 'Arms swinging across your body', 'Arms bent at 90 degrees, swinging forward and back', 'Holding your breath'], correct: 2 },
    { question: 'What shading technique uses dots placed closer together for darker areas?', options: ['Hatching', 'Blending', 'Cross-hatching', 'Stippling'], correct: 3 }
  ],
  'October': [
    { question: 'How many colors are on a complete color wheel?', options: ['6', '8', '12', '3'], correct: 2 },
    { question: 'What are warm colors?', options: ['Blues, greens, purples', 'Reds, oranges, yellows', 'Black, white, gray', 'Only primary colors'], correct: 1 },
    { question: 'When dribbling a soccer ball, which part of the foot should you use?', options: ['The toes', 'The heel', 'The inside of the foot', 'The outside of the foot only'], correct: 2 },
    { question: 'How are tertiary colors made?', options: ['Mixing two primary colors', 'Mixing a primary color with its neighboring secondary color', 'Adding white to any color', 'They come ready-made in the paint box'], correct: 1 },
    { question: 'Good sportsmanship includes which behavior?', options: ['Arguing with the referee', 'Complaining about losing', 'Encouraging teammates and saying "good game" to opponents', 'Only cheering when your team wins'], correct: 2 }
  ],
  'November': [
    { question: 'What is papier-mache paste typically made from?', options: ['Just water', 'Flour and water, or diluted white glue', 'Paint and water', 'Soap and water'], correct: 1 },
    { question: 'In the Human Knot cooperative challenge, what is the goal?', options: ['To tie the biggest knot', 'To untangle the group without letting go of hands', 'To hold hands and sing', 'To see who is strongest'], correct: 1 },
    { question: 'What is the proper relay baton pass technique?', options: ['Throw the baton to the next runner', 'The incoming runner places the baton into the outgoing runner\'s open palm', 'The outgoing runner turns around to grab it', 'Pass it over your head'], correct: 1 },
    { question: 'When building a clay animal sculpture, what does "scoring and slipping" mean?', options: ['Adding eyes and ears', 'Scratching surfaces and adding water to join clay pieces', 'Throwing the clay on the table', 'Painting the clay before it dries'], correct: 1 },
    { question: 'How many layers of newspaper strips should you apply in papier-mache for a strong form?', options: ['1 layer', 'At least 3 layers', '10 layers', 'No layers needed'], correct: 1 }
  ],
  'December': [
    { question: 'In collage, why is layering important?', options: ['It uses more glue', 'It creates depth with background, mid-ground, and foreground elements', 'It is not important', 'It makes the collage heavier'], correct: 1 },
    { question: 'In printmaking, what is "positive space"?', options: ['The empty area around the design', 'The inked area that prints onto the paper', 'The paper itself', 'The leftover paint'], correct: 1 },
    { question: 'In a circuit training workout, how long should you spend at each station?', options: ['10 minutes', 'About 45 seconds with 15 seconds to move to the next', '5 minutes', '30 minutes'], correct: 1 },
    { question: 'In yoga, what is the "Balloon Breath" technique?', options: ['Blowing up a real balloon', 'Inhaling slowly through the nose for 4 counts, holding, then exhaling for 6 counts', 'Breathing as fast as possible', 'Holding your breath for a minute'], correct: 1 },
    { question: 'Which yoga pose looks like an inverted V with hands and feet on the floor?', options: ['Tree Pose', 'Cobra Pose', 'Downward Dog', 'Warrior I'], correct: 2 }
  ],
  'January': [
    { question: 'What is characteristic of Impressionist painting?', options: ['Smooth, blended colors with no visible brushstrokes', 'Short, visible brushstrokes and capturing the feeling of light in a moment', 'Only painting portraits', 'Using only black and white paint'], correct: 1 },
    { question: 'In Cubism, what technique did Picasso use in his portraits?', options: ['Painting only realistic faces', 'Showing multiple perspectives of a face at the same time using geometric shapes', 'Using only circles', 'Painting upside down'], correct: 1 },
    { question: 'What is the key to improving balance?', options: ['Holding your breath', 'Tightening your core muscles ("squeeze belly button to spine")', 'Looking up at the ceiling', 'Moving as fast as possible'], correct: 1 },
    { question: 'When performing a forward roll, where should your chin be?', options: ['Looking straight ahead', 'Tucked to your chest to protect your neck', 'Turned to the side', 'Looking at your feet'], correct: 1 },
    { question: 'Claude Monet is famous for painting which subjects repeatedly at different times of day?', options: ['Portraits of kings', 'Water Lilies and Haystacks', 'City skylines', 'Animals in motion'], correct: 1 }
  ],
  'February': [
    { question: 'In cardboard loom weaving, what is the "warp"?', options: ['The horizontal yarn you weave with', 'The vertical strings strung on the loom first', 'The color pattern', 'The type of yarn'], correct: 1 },
    { question: 'African Kente cloth is known for which characteristic?', options: ['Pastel watercolor patterns', 'Bold geometric stripes with symbolic colors', 'Realistic animal portraits', 'All-white minimalist design'], correct: 1 },
    { question: 'The Israeli folk dance "Mayim Mayim" celebrates what?', options: ['Harvest', 'Water', 'Fire', 'Victory in battle'], correct: 1 },
    { question: 'When choreographing a 16-count dance sequence, how many sets of 4 beats do you plan?', options: ['2', '8', '4', '16'], correct: 2 },
    { question: 'In weaving, what happens if you reverse the over-under pattern on the next row?', options: ['The weaving falls apart', 'It creates the proper woven structure because opposite rows lock together', 'You have to start over', 'It creates a spiral pattern'], correct: 1 }
  ],
  'March': [
    { question: 'What is the Rule of Thirds in photography?', options: ['Always put your subject dead center', 'Divide the image into 9 sections and place the subject on one of the four intersections', 'Use exactly three colors', 'Take only three photos'], correct: 1 },
    { question: 'A photo essay tells a story through what?', options: ['A single photograph', 'A sequence of 5-8 photos arranged in deliberate order without words', 'A long written caption', 'A video recording'], correct: 1 },
    { question: 'What does "Leave No Trace" mean when hiking?', options: ['Do not leave footprints', 'Pack out all trash and leave nature as you found it', 'Do not take any photos', 'Stay on the trail only if it is convenient'], correct: 1 },
    { question: 'Which hiking safety rule is most important?', options: ['Always go alone for adventure', 'Always tell someone where you are going and when you will return', 'Wear flip-flops for comfort', 'Skip bringing water to save weight'], correct: 1 },
    { question: 'When designing an obstacle course, what three physical skills should stations test?', options: ['Reading, writing, math', 'Strength, agility, and balance', 'Cooking, cleaning, organizing', 'Singing, dancing, acting'], correct: 1 }
  ],
  'April': [
    { question: 'In digital art, what is a "layer" and why is it useful?', options: ['A type of paint brush', 'A transparent sheet that lets you edit parts of your artwork without affecting other parts', 'The border of the canvas', 'A type of eraser'], correct: 1 },
    { question: 'What does C.A.R.P. stand for in graphic design?', options: ['Colors Are Really Pretty', 'Contrast, Alignment, Repetition, Proximity', 'Create, Arrange, Revise, Print', 'Cut, Align, Resize, Paste'], correct: 1 },
    { question: 'In sprinting, what happens during the drive phase (first 10 meters)?', options: ['You jog slowly', 'You have a low body angle with powerful leg drive', 'You stop running', 'You wave to the crowd'], correct: 1 },
    { question: 'In the standing long jump, what should you do with your arms?', options: ['Keep them at your sides', 'Swing them back then explosively forward and up', 'Cross them over your chest', 'Hold them behind your back'], correct: 1 },
    { question: 'When designing a poster, why should you limit your color scheme?', options: ['Because color is expensive', 'Using 2-3 colors creates visual unity and avoids a cluttered look', 'Posters should only be black and white', 'There is no reason to limit colors'], correct: 1 }
  ],
  'May': [
    { question: 'When curating an art exhibition, what should you consider first?', options: ['The price of each piece', 'Selecting pieces that represent your best work and deciding on a theme for grouping', 'Only including your newest work', 'What your friends would pick'], correct: 1 },
    { question: 'An artist statement should answer which five questions?', options: ['Who, what, when, where, why', 'Title, materials/technique, why you created it, favorite part, what you learned', 'Name, age, school, grade, hobby', 'Price, size, weight, color, shape'], correct: 1 },
    { question: 'In the Marshmallow Tower challenge, why is it important to assign roles like "builder" and "architect"?', options: ['To make it more confusing', 'To practice teamwork, communication, and the delegation of responsibilities', 'Because one person cannot build anything', 'It is not important'], correct: 1 },
    { question: 'What is the purpose of a "Sportsmanship Circle" after team games?', options: ['To complain about unfair calls', 'For each person to share a compliment for an opponent and something to improve', 'To pick the MVP', 'To plan the next game'], correct: 1 },
    { question: 'What does visual hierarchy mean in design?', options: ['Making everything the same size', 'Making important information stand out through size, boldness, or contrast', 'Using only one font', 'Arranging things in a circle'], correct: 1 }
  ],
  'June': [
    { question: 'A year-end portfolio should compare September fitness test results to what?', options: ['Your friend\'s results', 'Your current results to measure improvement', 'Olympic records', 'Last year\'s homework'], correct: 1 },
    { question: 'The Artist\'s Choice independent project requires you to do what?', options: ['Follow step-by-step teacher instructions', 'Plan and create a project using any technique learned this year, making your own creative decisions', 'Only draw with pencil', 'Copy a famous artwork exactly'], correct: 1 },
    { question: 'In the Sports Festival, how many events are included?', options: ['2', '4', '6', '10'], correct: 2 },
    { question: 'What should a Summer Activity Plan include?', options: ['Only screen time', 'Activities you want to continue, something new to try, and specific weekly goals', 'A list of movies to watch', 'Nothing -- summer is for resting only'], correct: 1 },
    { question: 'What was your favorite part of Grade 4 Art & PE?', options: ['Discovering Impressionism and Cubism', 'Building sculptures and weaving patterns', 'Running, jumping, and playing team sports', 'All of the above!'], correct: 3 }
  ]
}
,

'age-10-math': {
  'September': [
    { question: 'In the number 4,287,315, what is the value of the digit 2?', options: ['2,000', '200,000', '20,000', '200'], correct: 1 },
    { question: 'When you multiply 346 by 10 cubed (10 to the third power), what happens to the digits?', options: ['They shift one place to the right', 'They shift three places to the left', 'Three zeros are added to the end', 'The number stays the same'], correct: 1 },
    { question: 'How do you read the decimal 4.207?', options: ['Four and two hundred seven thousandths', 'Four point two hundred seven', 'Four and twenty-seven hundredths', 'Four and two hundred seven hundredths'], correct: 0 },
    { question: 'Which is larger: 0.603 or 0.63?', options: ['0.603 is larger', '0.63 is larger', 'They are equal', 'You cannot compare them'], correct: 1 },
    { question: 'When rounding 12.457 to the nearest tenth, what do you get?', options: ['12.4', '12.5', '12.45', '12.46'], correct: 1 }
  ],
  'October': [
    { question: 'Using the distributive property, how would you break apart 234 x 6?', options: ['(200 x 6) + (30 x 6) + (4 x 6)', '(2 x 6) + (3 x 6) + (4 x 6)', '234 + 234 + 234 + 234 + 234 + 234', '(200 + 30) x (4 + 6)'], correct: 0 },
    { question: 'When using the area model for 34 x 26, how many partial products do you calculate?', options: ['2', '3', '4', '6'], correct: 2 },
    { question: 'What is the best estimate for 67 x 43?', options: ['About 2,000', 'About 2,800', 'About 3,200', 'About 2,400'], correct: 1 },
    { question: 'A school orders 15 boxes of pencils. Each box has 144 pencils. If they divide them equally among 9 classrooms, what operation do you do LAST?', options: ['Addition', 'Subtraction', 'Multiplication', 'Division'], correct: 3 },
    { question: 'When solving 2,456 x 37 using the standard algorithm, why do you estimate first?', options: ['To find the exact answer faster', 'To check if the exact answer is reasonable', 'Because estimation is more accurate', 'You do not need to estimate'], correct: 1 }
  ],
  'November': [
    { question: 'Using partial quotients, what is the first efficient step when solving 96 divided by 6?', options: ['Take out 10 groups of 6 (60)', 'Take out 6 groups of 6 (36)', 'Take out 16 groups of 6', 'Subtract 6 from 96'], correct: 0 },
    { question: 'What does the mnemonic "Dad, Mother, Sister, Brother, Rover" help you remember?', options: ['The steps of long division', 'How to check your work', 'Multiplication facts', 'Fraction simplification'], correct: 0 },
    { question: 'To solve 1,386 divided by 24, you first estimate by rounding 24 to what number?', options: ['20', '25', '30', '24'], correct: 1 },
    { question: 'Fifty students need buses that hold 6 students each. How many buses do you need?', options: ['8 buses', '9 buses', '8 remainder 2 buses', '7 buses'], correct: 1 },
    { question: 'You have 17 cookies to share equally among 4 friends. If each person gets 4 and one-quarter, what type of remainder is this?', options: ['Drop it', 'Round up', 'Share it as a fraction', 'Ignore it'], correct: 2 }
  ],
  'December': [
    { question: 'To simplify 12/18 to lowest terms, what do you find first?', options: ['The least common multiple', 'The greatest common factor', 'The product of numerators', 'The difference between 12 and 18'], correct: 1 },
    { question: 'When subtracting 3 and 1/4 minus 1 and 3/4, what must you do first?', options: ['Convert to decimals', 'Borrow 1 whole (4/4) from the 3', 'Find a common denominator', 'Add the fractions instead'], correct: 1 },
    { question: 'What is the least common multiple (LCM) of 3 and 4?', options: ['7', '12', '24', '1'], correct: 1 },
    { question: 'When adding 3 and 2/3 plus 2 and 3/4, what common denominator do you use?', options: ['7', '33', '12', '8'], correct: 2 },
    { question: 'What is 3 and 2/3 plus 2 and 3/4 equal to?', options: ['5 and 5/7', '6 and 5/12', '5 and 5/12', '6 and 1/2'], correct: 1 }
  ],
  'January': [
    { question: 'What is 4 x 2/3 expressed as a mixed number?', options: ['8/3 or 2 and 2/3', '8/12', '6/3 or 2', '4 and 2/3'], correct: 0 },
    { question: 'When multiplying 2/3 x 4/5 using an area model, the overlap represents what fraction?', options: ['6/15', '8/15', '8/8', '10/15'], correct: 1 },
    { question: 'Dividing 2/3 by 4 is the same as multiplying 2/3 by what number?', options: ['4', '1/4', '3/2', '2/4'], correct: 1 },
    { question: 'How many 1/4-cup servings can you pour from 2 cups of water?', options: ['2', '4', '6', '8'], correct: 3 },
    { question: 'What is 5 divided by 1/3?', options: ['5/3', '3/5', '15', '1 and 2/3'], correct: 2 }
  ],
  'February': [
    { question: 'When adding 45.6 + 12.389, what must you do first?', options: ['Add zeros to make the same number of decimal places', 'Remove the decimals', 'Round both numbers', 'Multiply by 1000'], correct: 0 },
    { question: 'To multiply 2.45 x 6, you first multiply 245 x 6 = 1,470. Where does the decimal go in the answer?', options: ['After the first digit: 1.470', 'Two places from the right: 14.70', 'Three places from the right: 1.470', 'No decimal needed: 1470'], correct: 1 },
    { question: 'When multiplying 0.3 x 0.4, why is the answer (0.12) smaller than both factors?', options: ['Because you made a calculation error', 'Because both factors are less than 1', 'Because decimals always get smaller', 'It should actually be 12.0'], correct: 1 },
    { question: 'To solve 4.2 divided by 0.6, what do you do to both numbers first?', options: ['Subtract 0.6 from both', 'Multiply both by 10 to make the divisor a whole number', 'Divide both by 10', 'Round both to the nearest whole number'], correct: 1 },
    { question: 'What is 7.56 divided by 0.4?', options: ['1.89', '18.9', '30.24', '0.189'], correct: 1 }
  ],
  'March': [
    { question: 'A rectangular prism has 4 cubes along the length, 3 along the width, and 2 layers. What is its volume?', options: ['9 cubic units', '24 cubic units', '18 cubic units', '12 cubic units'], correct: 1 },
    { question: 'The formula V = B x h means volume equals what?', options: ['Base times height', 'Bottom times half', 'Breadth times height', 'Border times height'], correct: 0 },
    { question: 'A composite figure is made of two rectangular prisms: one is 3x4x2 and the other is 3x4x3. What is the total volume?', options: ['24 cubic units', '36 cubic units', '60 cubic units', '84 cubic units'], correct: 2 },
    { question: 'To convert 5 feet to inches, what operation do you use?', options: ['Divide by 12', 'Multiply by 12', 'Add 12', 'Subtract 12'], correct: 1 },
    { question: 'Which is the correct conversion: 3 gallons = ? cups', options: ['24 cups', '12 cups', '48 cups', '36 cups'], correct: 2 }
  ],
  'April': [
    { question: 'On a coordinate plane, what does the ordered pair (3, 5) tell you?', options: ['Go up 3 and right 5', 'Go right 3 and up 5', 'Go left 3 and down 5', 'The point is at position 35'], correct: 1 },
    { question: 'The point (0, 0) on a coordinate plane is called what?', options: ['The center', 'The vertex', 'The origin', 'The axis'], correct: 2 },
    { question: 'A rectangle has vertices at (2,3), (7,3), (7,8), and (2,8). What is its perimeter?', options: ['16 units', '10 units', '35 units', '20 units'], correct: 0 },
    { question: 'Why is a square also considered a rectangle?', options: ['It has four equal sides', 'All rectangles are squares', 'It has four right angles and opposite sides parallel and equal', 'It is not actually a rectangle'], correct: 2 },
    { question: 'How many lines of symmetry does a square have?', options: ['2', '1', '4', '0'], correct: 2 }
  ],
  'May': [
    { question: 'What type of data is "favorite color"?', options: ['Numerical data', 'Categorical data', 'Measurement data', 'Fractional data'], correct: 1 },
    { question: 'On a line plot, what does each X above the number line represent?', options: ['A category', 'One data point/measurement', 'A range of numbers', 'The average'], correct: 1 },
    { question: 'In a bar graph, what must the y-axis always have?', options: ['Colors', 'A consistent scale', 'Numbers from 1 to 10', 'Names of categories'], correct: 1 },
    { question: 'A line graph is best used to show what kind of data?', options: ['Categories like favorite foods', 'Parts of a whole', 'Change over time', 'Random numbers'], correct: 2 },
    { question: 'If a line graph of savings shows a steep drop in March, what does that likely mean?', options: ['The person earned more money', 'The person spent a large amount', 'The data is wrong', 'The graph should be a bar graph instead'], correct: 1 }
  ],
  'June': [
    { question: 'When solving a multi-step word problem, what should you do first?', options: ['Start calculating immediately', 'Identify what you are finding and what operations to use', 'Skip to the last step', 'Guess the answer'], correct: 1 },
    { question: 'If a room is 10 feet long, 8 feet wide, and 9 feet tall, what is its volume in cubic feet?', options: ['27 cubic feet', '720 cubic feet', '80 cubic feet', '90 cubic feet'], correct: 1 },
    { question: 'When planning a vacation budget with decimal prices, why is estimation useful?', options: ['It gives the exact answer', 'It helps catch unreasonable answers before finishing', 'It replaces the need for exact math', 'It is only for advanced students'], correct: 1 },
    { question: 'When reflecting on your math portfolio, what is the most important question to ask yourself?', options: ['Did I get every answer right?', 'What topics do I want to keep practicing?', 'Was this easier than last year?', 'How fast can I finish?'], correct: 1 },
    { question: 'What was your favorite math topic this year -- or did you enjoy ALL of them?', options: ['Fractions and decimals', 'Geometry and volume', 'Multiplication and division', 'All of the above!'], correct: 3 }
  ]
},
'age-10-english': {
  'September': [
    { question: 'What is the "5-finger rule" used for in reading?', options: ['Counting paragraphs on a page', 'Finding a "just right" book by counting unknown words on a page', 'Measuring how long a chapter is', 'Counting the number of characters'], correct: 1 },
    { question: 'What does the "STEAL" method help you analyze in a character?', options: ['Speech, Thoughts, Effect on others, Actions, Looks', 'Setting, Theme, Emotion, Action, Language', 'Strength, Talent, Energy, Ability, Learning', 'Story, Text, Evidence, Analysis, Logic'], correct: 0 },
    { question: 'On a "Plot Mountain" diagram, what happens at the climax?', options: ['The characters are introduced', 'The problem first appears', 'The turning point or highest action occurs', 'The conflict is resolved'], correct: 2 },
    { question: 'What is the difference between a topic and a theme?', options: ['A topic is one word; a theme is a complete sentence about a life lesson', 'They are the same thing', 'A theme is always about animals', 'A topic is longer than a theme'], correct: 0 },
    { question: 'Which of these is a complete THEME statement rather than just a topic?', options: ['Friendship', 'Courage means acting even when you are scared', 'Animals', 'Adventure'], correct: 1 }
  ],
  'October': [
    { question: 'What is the difference between a "watermelon story" and a "seed story"?', options: ['A watermelon story is about fruit', 'A watermelon story is too big; a seed story focuses on one small moment', 'A seed story is longer', 'They are the same thing'], correct: 1 },
    { question: 'Which of these is an example of "showing, not telling"?', options: ['He was angry', 'His face turned red and his fists clenched tight', 'She was sad', 'The pizza was good'], correct: 1 },
    { question: 'When writing dialogue, what must you do every time a new person speaks?', options: ['Use a period', 'Start a new paragraph', 'Use bold text', 'Write their name first'], correct: 1 },
    { question: 'What does the ARMS revision strategy stand for?', options: ['Add, Remove, Move, Substitute', 'Analyze, Read, Mark, Summarize', 'Ask, Revise, Make, Share', 'Align, Rewrite, Measure, Score'], correct: 0 },
    { question: 'What does the CUPS editing strategy help you check for?', options: ['Content, Understanding, Purpose, Style', 'Capitalization, Usage, Punctuation, Spelling', 'Characters, Unity, Plot, Setting', 'Clarity, Uniqueness, Power, Structure'], correct: 1 }
  ],
  'November': [
    { question: 'Which of these is NOT a common text feature in nonfiction books?', options: ['Glossary', 'Table of contents', 'Rhyme scheme', 'Captions'], correct: 2 },
    { question: 'If a paragraph uses signal words like "because" and "as a result," what text structure is it likely using?', options: ['Compare and contrast', 'Chronological order', 'Cause and effect', 'Problem and solution'], correct: 2 },
    { question: 'What is the key rule when taking notes from a source?', options: ['Copy sentences word for word', 'Read, cover the text, then write in your own words', 'Only write down numbers and dates', 'Skip the note-taking and go straight to writing'], correct: 1 },
    { question: 'When evaluating if a website is trustworthy, what should you check?', options: ['How colorful the website looks', 'The URL, author, and date of the information', 'How many pictures it has', 'If it was the first search result'], correct: 1 },
    { question: 'What is plagiarism?', options: ['Writing your own ideas', 'Using someone else\'s words or ideas without giving them credit', 'Reading too many books', 'Taking notes in bullet points'], correct: 1 }
  ],
  'December': [
    { question: 'What is the difference between a fact and an opinion?', options: ['Facts are always short; opinions are long', 'Facts can be proven true or false; opinions are beliefs or judgments', 'Opinions are always wrong', 'There is no difference'], correct: 1 },
    { question: 'What does the OREO structure stand for in opinion writing?', options: ['Organize, Read, Explain, Observe', 'Opinion, Reason, Evidence/Examples, Opinion restated', 'Outline, Research, Edit, Output', 'Open, Review, Examine, Organize'], correct: 1 },
    { question: 'What is a counterargument?', options: ['A second essay on the same topic', 'An opposing viewpoint that you acknowledge and then refute', 'A type of poem', 'The conclusion of your essay'], correct: 1 },
    { question: 'Which of these is a STRONG claim statement?', options: ['Dogs are nice', 'I like dogs', 'Because they improve physical health and provide emotional support, dogs are the best pets for families', 'Dogs exist'], correct: 2 },
    { question: 'What should the conclusion of a persuasive essay include?', options: ['New reasons you did not mention before', 'A restated claim and a call to action', 'An apology to the reader', 'A summary of every single detail'], correct: 1 }
  ],
  'January': [
    { question: 'What is the present perfect tense of "I eat an apple"?', options: ['I ate an apple', 'I have eaten an apple', 'I will eat an apple', 'I am eating an apple'], correct: 1 },
    { question: 'What does FANBOYS stand for?', options: ['Types of poems', 'Coordinating conjunctions: for, and, nor, but, or, yet, so', 'Sentence starters', 'Parts of a paragraph'], correct: 1 },
    { question: 'Which sentence uses a comma correctly for items in a series?', options: ['I bought apples bananas and grapes', 'I bought apples, bananas, and grapes', 'I bought, apples bananas and grapes', 'I bought apples bananas, and grapes'], correct: 1 },
    { question: 'What are correlative conjunctions?', options: ['Single joining words like "and" or "but"', 'Pairs of conjunctions that work together like "either/or" and "neither/nor"', 'Words that replace nouns', 'Punctuation marks at the end of sentences'], correct: 1 },
    { question: 'What is one effective way to vary your sentence beginnings?', options: ['Always start with "The"', 'Start with a prepositional phrase, adverb, or "-ing" word', 'Only use short sentences', 'Never use the word "I"'], correct: 1 }
  ],
  'February': [
    { question: 'What is the difference between a simile and a metaphor?', options: ['A simile uses "like" or "as"; a metaphor says something IS something else', 'A metaphor uses "like" or "as"; a simile does not', 'They are exactly the same', 'Similes are only used in poetry'], correct: 0 },
    { question: '"The wind whispered in the trees" is an example of what?', options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], correct: 2 },
    { question: 'What is an idiom?', options: ['A type of poem', 'A phrase that does not mean what the words literally say', 'A way to organize paragraphs', 'A punctuation mark'], correct: 1 },
    { question: 'A haiku follows what syllable pattern?', options: ['5-7-5', '7-7-7', 'AABB', '10-10-10'], correct: 0 },
    { question: 'What is hyperbole?', options: ['Giving human traits to objects', 'Extreme exaggeration for effect', 'Comparing two things using "like"', 'A type of poem with an AABBA rhyme scheme'], correct: 1 }
  ],
  'March': [
    { question: 'What makes a good research topic for an essay?', options: ['Something extremely broad like "Space"', 'Something extremely narrow like "My dog Spot"', 'Something in between like "Working Dogs" with specific guiding questions', 'Whatever topic the teacher assigns only'], correct: 2 },
    { question: 'What is the "Index Card Method" for research?', options: ['Writing the entire essay on cards', 'Dedicating one card per guiding question and jotting bullet-point facts', 'Drawing pictures on cards', 'Memorizing cards for a test'], correct: 1 },
    { question: 'When drafting an informational essay, what should the introduction include?', options: ['A hook, clear topic statement, and preview of sub-topics', 'All the facts you found', 'A counterargument', 'Your personal opinion'], correct: 0 },
    { question: 'In a bibliography, sources should be listed in what order?', options: ['Order of importance', 'Alphabetical order by author', 'Chronological order by publication date', 'Random order'], correct: 1 },
    { question: 'What is paraphrasing?', options: ['Copying text exactly as written', 'Putting information into your own words without changing the meaning', 'Making up information', 'Deleting information you do not need'], correct: 1 }
  ],
  'April': [
    { question: 'Why is it important to research the historical context before starting a novel study?', options: ['It is not important', 'It helps you understand the setting, time period, and characters better', 'So you can skip reading the book', 'To find out how much the book costs'], correct: 1 },
    { question: 'What is a "character arc"?', options: ['The shape of a character in a drawing', 'How a character changes from the beginning to the end of a story', 'A type of punctuation', 'The setting of the story'], correct: 1 },
    { question: 'In literature, what is symbolism?', options: ['Using numbers in a story', 'When an object, color, or event represents a bigger idea', 'Writing in code', 'A type of figurative language that compares two things'], correct: 1 },
    { question: 'When writing a literary response essay, what must you include to support your claims?', options: ['Your personal feelings only', 'Direct quotes from the text as evidence', 'A summary of every chapter', 'A counterargument'], correct: 1 },
    { question: 'What does it mean to use "context clues" when reading?', options: ['Looking at pictures in the book', 'Using the surrounding words and sentences to figure out the meaning of an unknown word', 'Asking a teacher for the definition', 'Skipping the word entirely'], correct: 1 }
  ],
  'May': [
    { question: 'What is "media literacy"?', options: ['The ability to read fast', 'The ability to analyze and evaluate different forms of media', 'Knowing how to use a computer', 'Watching a lot of television'], correct: 1 },
    { question: 'What does the CRAAP test help you evaluate?', options: ['Your writing style', 'The credibility and quality of a website or source', 'How interesting a commercial is', 'Your public speaking skills'], correct: 1 },
    { question: 'What are the "3 Ps" of effective presenting?', options: ['Patience, Practice, Perfection', 'Posture, Projection, Pacing', 'Planning, Printing, Performing', 'Preparation, Pictures, Punchlines'], correct: 1 },
    { question: 'When creating presentation slides, what is the "Rule of 6"?', options: ['Use 6 colors per slide', 'No more than 6 bullet points with no more than 6 words per line', 'Present for exactly 6 minutes', 'Include 6 images per slide'], correct: 1 },
    { question: 'Which persuasion technique uses a famous person to promote a product?', options: ['Bandwagon', 'Testimonial', 'Emotional appeal', 'Exaggeration'], correct: 1 }
  ],
  'June': [
    { question: 'What is the purpose of a reading comprehension "escape room" review?', options: ['To escape from the classroom', 'To review skills like theme, text structure, and inference in a fun way', 'To test how fast you can read', 'To compete against other students'], correct: 1 },
    { question: 'When curating a writing portfolio, what should you look for when selecting your best pieces?', options: ['Only the longest pieces', 'Pieces that show growth, variety of skills, and personal pride', 'Only the pieces with perfect grades', 'Whatever is easiest to find'], correct: 1 },
    { question: 'What should an "Author\'s Note" in your portfolio include?', options: ['A list of all your mistakes', 'A brief bio, summary of your writing journey, and goals for the future', 'A summary of every book you read', 'A letter to your teacher'], correct: 1 },
    { question: 'What is the main purpose of a Publishing Party?', options: ['To get a grade', 'To celebrate growth and share your best writing with an audience', 'To compare your work with others', 'To sell your writing'], correct: 1 },
    { question: 'Looking back at 5th grade English, what did you enjoy most -- or was it ALL awesome?', options: ['Writing stories and poems', 'Reading novels and analyzing characters', 'Researching and presenting', 'All of the above!'], correct: 3 }
  ]
},
'age-10-science': {
  'September': [
    { question: 'In DNA, which base pairs with Adenine (A)?', options: ['Guanine (G)', 'Cytosine (C)', 'Thymine (T)', 'Uracil (U)'], correct: 2 },
    { question: 'What tool is used to predict the probability of traits being passed to offspring?', options: ['A microscope', 'A Punnett square', 'A telescope', 'A thermometer'], correct: 1 },
    { question: 'In the predator/prey bean simulation, why did one color of bean survive better than others?', options: ['It tasted better', 'It was camouflaged against the background', 'It was heavier', 'It was bigger'], correct: 1 },
    { question: 'What is the correct order of the classification hierarchy from largest to smallest?', options: ['Species, Genus, Family, Order, Class, Phylum, Kingdom', 'Kingdom, Phylum, Class, Order, Family, Genus, Species', 'Kingdom, Class, Phylum, Order, Family, Species, Genus', 'Genus, Species, Family, Order, Class, Phylum, Kingdom'], correct: 1 },
    { question: 'What is a dichotomous key used for?', options: ['Opening locked doors', 'Identifying organisms through a series of two-choice questions', 'Measuring plant growth', 'Testing water quality'], correct: 1 }
  ],
  'October': [
    { question: 'What happens to molecules when you add heat energy to a solid?', options: ['They stop moving', 'They move faster, potentially changing to a liquid or gas', 'They get larger in size', 'They change color'], correct: 1 },
    { question: 'Which of these is a sign that a CHEMICAL change has occurred?', options: ['Tearing a piece of paper', 'Melting an ice cube', 'Formation of gas bubbles, color change, or heat production', 'Dissolving salt in water'], correct: 2 },
    { question: 'On the pH scale, what number is considered neutral?', options: ['0', '7', '14', '10'], correct: 1 },
    { question: 'When using red cabbage juice as an indicator, what color indicates an acid?', options: ['Green or blue', 'Red or pink', 'Purple (no change)', 'Yellow'], correct: 1 },
    { question: 'How could you separate a mixture of sand, salt, water, and iron filings?', options: ['Just wait and they will separate on their own', 'Use a magnet for iron, filter for sand, evaporate for salt', 'Freeze the mixture', 'Stir it faster'], correct: 1 }
  ],
  'November': [
    { question: 'Which of Newton\'s laws explains why a coin on a card drops into a cup when the card is flicked away?', options: ['Newton\'s First Law (Inertia)', 'Newton\'s Second Law (F=ma)', 'Newton\'s Third Law (Action/Reaction)', 'The law of gravity'], correct: 0 },
    { question: 'What energy transformation happens when you rub your hands together?', options: ['Thermal to mechanical', 'Mechanical to thermal', 'Electrical to light', 'Sound to kinetic'], correct: 1 },
    { question: 'Which simple machine uses a rigid bar resting on a fulcrum to lift heavy objects?', options: ['Pulley', 'Inclined plane', 'Lever', 'Wheel and axle'], correct: 2 },
    { question: 'In a simple circuit, what is the difference between a conductor and an insulator?', options: ['A conductor blocks electricity; an insulator allows it', 'A conductor allows electricity to flow; an insulator does not', 'They are the same thing', 'Conductors are only used in batteries'], correct: 1 },
    { question: 'A balloon rocket moving along a string demonstrates which of Newton\'s laws?', options: ['First Law only', 'Second Law only', 'Third Law (Action/Reaction) -- air pushes backward, balloon moves forward', 'None of them'], correct: 2 }
  ],
  'December': [
    { question: 'How do muscles work in antagonistic pairs?', options: ['Both contract at the same time', 'When one contracts, the other relaxes (e.g., bicep/tricep)', 'They never work together', 'Only one muscle in the body moves at a time'], correct: 1 },
    { question: 'What is the correct path of blood through the body?', options: ['Body to lungs to heart to body', 'Heart to body to lungs to heart', 'Heart to lungs to heart to body', 'Lungs to body to heart to lungs'], correct: 2 },
    { question: 'In the lung model experiment, what does the stretched balloon at the bottom represent?', options: ['The heart', 'The diaphragm', 'The trachea', 'The brain'], correct: 1 },
    { question: 'What are the three main macronutrients your body needs?', options: ['Vitamins, minerals, water', 'Carbohydrates, proteins, fats', 'Sugar, salt, fiber', 'Iron, calcium, potassium'], correct: 1 },
    { question: 'In the fat test experiment, what happens when you rub a high-fat food on a brown paper bag?', options: ['Nothing happens', 'The paper dissolves', 'It leaves a translucent grease spot', 'The paper changes color permanently'], correct: 2 }
  ],
  'January': [
    { question: 'What are the three types of tectonic plate boundaries?', options: ['Divergent, convergent, and transform', 'Up, down, and sideways', 'Fast, slow, and medium', 'Eastern, western, and central'], correct: 0 },
    { question: 'In the crayon rock cycle experiment, what does adding heat and pressure represent?', options: ['Sedimentary rock forming', 'Metamorphic rock forming', 'Igneous rock forming', 'Mineral crystal growth'], correct: 1 },
    { question: 'What is the difference between weather and climate?', options: ['They are the same thing', 'Weather is short-term daily conditions; climate is long-term average patterns', 'Climate changes every day; weather stays the same', 'Weather is only about temperature; climate is about rain'], correct: 1 },
    { question: 'What is groundwater?', options: ['Water in clouds', 'Water stored underground in aquifers after soaking through soil and rock', 'Water on the surface of lakes', 'Water that has evaporated'], correct: 1 },
    { question: 'What process in the water cycle involves plants releasing water vapor through their leaves?', options: ['Evaporation', 'Condensation', 'Transpiration', 'Precipitation'], correct: 2 }
  ],
  'February': [
    { question: 'In a food web, what do decomposers do?', options: ['Make their own food from sunlight', 'Break down dead organisms and return nutrients to the soil', 'Hunt and eat other animals', 'Produce oxygen'], correct: 1 },
    { question: 'What was demonstrated by the "blubber experiment" with ice water and shortening?', options: ['That blubber makes animals slower', 'How insulation (blubber) helps animals survive in cold environments', 'That ice melts faster in fat', 'That all animals need blubber'], correct: 1 },
    { question: 'What is biodiversity?', options: ['Having only one species in an area', 'The variety of different species of plants and animals in an ecosystem', 'A type of biome', 'The study of biology'], correct: 1 },
    { question: 'In the oil spill simulation, which cleanup method was found to be most difficult?', options: ['All methods were equally easy', 'Complete cleanup was very difficult; the environment was permanently damaged', 'Dish soap removed all the oil perfectly', 'Skimming with spoons worked best'], correct: 1 },
    { question: 'What does the 10% energy transfer rule in food webs mean?', options: ['Each trophic level passes on 10% of its energy to the next level', 'Animals eat 10% of their body weight daily', '10% of species go extinct each year', 'Plants produce 10% of Earth\'s oxygen'], correct: 0 }
  ],
  'March': [
    { question: 'Using the toilet paper solar system model, why are the outer planets much farther apart than the inner planets?', options: ['Because the model is wrong', 'Because the actual distances in space are vastly larger for outer planets', 'Because the outer planets are bigger', 'Because outer planets move faster'], correct: 1 },
    { question: 'What is the life cycle of an average-sized star in correct order?', options: ['Nebula, main sequence, red giant, planetary nebula, white dwarf', 'White dwarf, red giant, main sequence, nebula', 'Main sequence, supernova, black hole, nebula', 'Red giant, nebula, main sequence, white dwarf'], correct: 0 },
    { question: 'During a solar eclipse, what is the correct alignment of the Sun, Earth, and Moon?', options: ['Earth, Sun, Moon', 'Sun, Earth, Moon', 'Sun, Moon, Earth', 'Moon, Earth, Sun'], correct: 2 },
    { question: 'How does the antacid rocket experiment demonstrate Newton\'s Third Law?', options: ['The tablet dissolves slowly', 'The gas pressure pushes downward, launching the canister upward (action/reaction)', 'Gravity pulls the canister down', 'The water freezes and expands'], correct: 1 },
    { question: 'Why does the Moon not crash into the Earth?', options: ['Because gravity does not affect the Moon', 'Because the Moon\'s forward momentum balances the pull of gravity', 'Because the Moon is attached to an invisible string', 'Because the Moon is too small'], correct: 1 }
  ],
  'April': [
    { question: 'What are the inputs and outputs of photosynthesis?', options: ['Inputs: sunlight, water, CO2; Outputs: oxygen, glucose', 'Inputs: oxygen, glucose; Outputs: sunlight, water', 'Inputs: soil, water; Outputs: oxygen, sugar', 'Inputs: glucose, oxygen; Outputs: CO2, water'], correct: 0 },
    { question: 'In a flower, what are the male and female reproductive parts called?', options: ['Male: pistil; Female: stamen', 'Male: stamen; Female: pistil', 'Male: petal; Female: sepal', 'Male: root; Female: stem'], correct: 1 },
    { question: 'In the yeast balloon experiment, which bottle inflated the MOST?', options: ['Cold water + yeast only', 'Warm water + yeast only', 'Warm water + sugar + yeast', 'Cold water + sugar + yeast'], correct: 2 },
    { question: 'What role do decomposers play in an ecosystem?', options: ['They produce oxygen', 'They break down dead matter and return nutrients to the soil', 'They hunt prey', 'They pollinate flowers'], correct: 1 },
    { question: 'What gas does yeast produce that causes the balloon to inflate in the experiment?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide (CO2)', 'Helium'], correct: 2 }
  ],
  'May': [
    { question: 'What are the steps of the Engineering Design Process in order?', options: ['Ask, Imagine, Plan, Create, Test, Improve', 'Create, Test, Ask, Improve, Plan', 'Plan, Build, Destroy, Rebuild, Present', 'Think, Do, Check, Turn in'], correct: 0 },
    { question: 'Why is a triangle considered the strongest structural shape for building bridges?', options: ['It looks the best', 'It distributes force evenly across all three sides', 'It uses the least material', 'It is the easiest to draw'], correct: 1 },
    { question: 'What are the four forces of flight?', options: ['Push, pull, drag, spin', 'Lift, thrust, drag, gravity', 'Up, down, left, right', 'Speed, acceleration, friction, weight'], correct: 1 },
    { question: 'What causes a brushbot to move across a table?', options: ['A magnet pushing it', 'The vibration of the motor transfers through the bristle "legs"', 'Wind from a fan', 'Gravity pulling it downhill'], correct: 1 },
    { question: 'When building the spaghetti tower challenge, why does the marshmallow need to go on TOP?', options: ['To make it taste better', 'To test whether the structure can support weight at its highest point', 'Because the marshmallow is the heaviest part', 'It does not matter where it goes'], correct: 1 }
  ],
  'June': [
    { question: 'In a scientific experiment, what is the independent variable?', options: ['The thing you measure', 'The thing you change on purpose', 'The things that stay the same', 'The conclusion'], correct: 1 },
    { question: 'When writing a conclusion for an experiment, what should you include?', options: ['Only your opinion', 'Whether your hypothesis was supported and what the data showed', 'A new experiment idea', 'A list of all your materials'], correct: 1 },
    { question: 'Why is it important to communicate scientific findings to others?', options: ['To show off', 'So others can learn, verify results, and build on the knowledge', 'Because the teacher said so', 'It is not actually important'], correct: 1 },
    { question: 'When creating a science presentation, what should you focus on?', options: ['Using as many words as possible on each slide', 'Clear headings, graphs, bold visuals, and a logical structure', 'Making it as long as possible', 'Only reading from your notes'], correct: 1 },
    { question: 'What was the most exciting science topic this year -- or were they ALL amazing?', options: ['Genetics and DNA experiments', 'Space and astronomy', 'Chemistry and explosions', 'All of the above!'], correct: 3 }
  ]
},
'age-10-art': {
  'September': [
    { question: 'What are the different types of line weight used to communicate in a drawing?', options: ['Only thick lines matter', 'Varied weights from light to dark create texture, movement, and visual interest', 'All lines should be the same thickness', 'Line weight refers to how heavy the paper is'], correct: 1 },
    { question: 'What is the difference between geometric and organic shapes?', options: ['Geometric shapes are natural; organic shapes are mathematical', 'Geometric shapes are mathematical and precise; organic shapes are freeform and natural', 'There is no difference', 'Organic shapes only exist in paintings'], correct: 1 },
    { question: 'When shading a sphere, what are the five elements of value you should include?', options: ['Light, medium, dark, darker, darkest', 'Highlight, mid-tone, core shadow, cast shadow, and reflected light', 'Only light and dark', 'Black and white only'], correct: 1 },
    { question: 'What is the purpose of a value scale in art?', options: ['To measure the weight of art supplies', 'To create a smooth transition from light to dark showing all gradations of shade', 'To determine the price of artwork', 'To list the colors in a painting'], correct: 1 },
    { question: 'How do you turn a 2D shape into a 3D form using drawing?', options: ['Make the outline thicker', 'Use shading and value to create the illusion of depth and volume', 'Draw it bigger', 'Add glitter'], correct: 1 }
  ],
  'October': [
    { question: 'In 1-point perspective, where do all receding lines converge?', options: ['At the top of the page', 'At a single vanishing point on the horizon line', 'At the bottom corners', 'They do not converge'], correct: 1 },
    { question: 'When is 2-point perspective used instead of 1-point perspective?', options: ['When drawing circles', 'When viewing an object from a corner rather than face-on', 'When using watercolor', 'For portraits only'], correct: 1 },
    { question: 'On a standard human face, where are the eyes located proportionally?', options: ['Near the top of the head', 'About halfway down the head', 'In the lower third', 'One-third from the top'], correct: 1 },
    { question: 'How many "head-lengths" tall is an average adult human figure?', options: ['5 head-lengths', '6 head-lengths', '7.5 to 8 head-lengths', '10 head-lengths'], correct: 2 },
    { question: 'What is a gesture drawing?', options: ['A very detailed, slow drawing', 'A rapid, loose sketch capturing the essential movement and pose of a figure', 'A drawing of hands only', 'A drawing using only straight lines'], correct: 1 }
  ],
  'November': [
    { question: 'What is the difference between a tint and a shade?', options: ['A tint adds black; a shade adds white', 'A tint adds white to a color; a shade adds black to a color', 'Tints and shades are the same thing', 'A tint is a type of paintbrush'], correct: 1 },
    { question: 'What is an analogous color scheme?', options: ['Colors opposite each other on the color wheel', 'Colors next to each other on the color wheel', 'Only black and white', 'All colors mixed together'], correct: 1 },
    { question: 'In watercolor painting, what does "wet-on-wet" technique produce?', options: ['Sharp, crisp edges', 'Soft, blurry blends and gradients', 'Thick textured strokes', 'No color at all'], correct: 1 },
    { question: 'What is "impasto" painting technique?', options: ['Applying paint very thinly', 'Applying paint thickly with a palette knife to create 3D texture', 'Using only water', 'Painting on wet plaster'], correct: 1 },
    { question: 'Mixing complementary colors (like red and green) produces what result?', options: ['A brighter version of both colors', 'Neutral browns or grays', 'Black paint', 'White paint'], correct: 1 }
  ],
  'December': [
    { question: 'In collage art, what does "juxtaposition" mean?', options: ['Using only one material', 'Placing unexpected elements next to each other to create a surprising effect', 'Cutting paper into circles', 'Gluing everything in a straight line'], correct: 1 },
    { question: 'What is "dry brushing" used for in mixed media?', options: ['To clean your brushes', 'To highlight raised textures by lightly brushing a contrasting color over the surface', 'To remove paint from a canvas', 'To dry the art faster'], correct: 1 },
    { question: 'What is "blackout poetry" in altered book art?', options: ['Writing a poem with no rhymes', 'Blacking out words on a page so the remaining words form a new poem', 'Drawing only in black ink', 'A poem about darkness'], correct: 1 },
    { question: 'What is the purpose of a mixed media self-portrait silhouette?', options: ['To make a perfect photographic copy of yourself', 'To express your identity by combining drawing, painting, and symbolic collage elements inside your outline', 'To practice shading', 'To make a realistic sculpture'], correct: 1 },
    { question: 'What does "upcycling" mean in art?', options: ['Recycling materials into the same thing', 'Transforming discarded objects into something of higher artistic value', 'Throwing away old art', 'Using only new materials'], correct: 1 }
  ],
  'January': [
    { question: 'What is an armature in sculpture?', options: ['A type of paint', 'An internal framework or skeleton that supports a 3D sculpture', 'A type of clay', 'The final layer of paint'], correct: 1 },
    { question: 'What is the subtractive method of sculpture?', options: ['Adding material to build a form', 'Removing or carving away material to reveal a 3D form inside', 'Painting over a sculpture', 'Using only clay'], correct: 1 },
    { question: 'In clay hand-building, what does "score and slip" mean?', options: ['Keeping score of your clay pieces and slipping them on a shelf', 'Scratching the surface of clay and adding liquid clay (slip) to securely join two pieces', 'Sliding clay across the table', 'Cutting clay with scissors'], correct: 1 },
    { question: 'What is the difference between coil building and slab building in clay?', options: ['They are the same technique', 'Coil building uses rolled ropes of clay stacked; slab building uses flat sheets of clay joined at angles', 'Slab building uses coils', 'Coil building uses flat sheets'], correct: 1 },
    { question: 'What does "leather hard" mean in ceramics?', options: ['Clay that has been fired in a kiln', 'Clay that is stiff but not fully dry, ideal for joining pieces', 'Clay that is completely wet', 'Clay mixed with leather'], correct: 1 }
  ],
  'February': [
    { question: 'What was revolutionary about Renaissance art compared to Medieval art?', options: ['Renaissance art used only black and white', 'Renaissance art introduced realism, humanism, and linear perspective', 'Medieval art was more realistic', 'Renaissance art had no rules'], correct: 1 },
    { question: 'What technique did Vincent van Gogh famously use in his paintings?', options: ['Smooth, blended brushstrokes', 'Visible, thick, expressive brushstrokes (impasto)', 'Only pencil drawing', 'Digital painting'], correct: 1 },
    { question: 'In Cubism, what did artists like Picasso do differently from traditional artists?', options: ['They painted only landscapes', 'They broke objects into geometric shapes and showed multiple viewpoints at once', 'They used only one color', 'They painted everything realistically'], correct: 1 },
    { question: 'What is "Exquisite Corpse" in the context of Surrealism?', options: ['A scary painting', 'A collaborative drawing game where each person draws part of a figure without seeing the others', 'A type of sculpture', 'A famous Surrealist painting'], correct: 1 },
    { question: 'What is the key characteristic of Surrealist art?', options: ['Perfect realism', 'Combining realistic techniques with impossible, dream-like subject matter', 'Only abstract shapes', 'Using only primary colors'], correct: 1 }
  ],
  'March': [
    { question: 'What is negative space in a logo or design?', options: ['Space that is painted black', 'The empty or background space around and between the main subject', 'Space that has been erased', 'Space where nothing exists'], correct: 1 },
    { question: 'What is the difference between serif and sans-serif fonts?', options: ['Serif fonts have small decorative lines on letter ends; sans-serif fonts do not', 'Sans-serif has decorative lines; serif does not', 'They are identical', 'Serif fonts are only used for headlines'], correct: 0 },
    { question: 'In relief printing, why must text be carved backwards on the block?', options: ['Because it looks cooler', 'So that when inked and pressed onto paper, the text reads correctly (mirror image)', 'To make carving easier', 'It does not need to be backwards'], correct: 1 },
    { question: 'What does "pulling an edition" mean in printmaking?', options: ['Taking a block off the shelf', 'Creating a set number of identical prints from the same carved block, numbered and signed', 'Ripping the paper off the block', 'Making only one print'], correct: 1 },
    { question: 'When a print looks "salty," what went wrong?', options: ['Actual salt got on the print', 'Too little ink was applied to the block', 'Too much ink was applied', 'The paper was too wet'], correct: 1 }
  ],
  'April': [
    { question: 'What is the Rule of Thirds in photography?', options: ['Dividing the frame into three horizontal sections only', 'Dividing the frame into a 3x3 grid and placing subjects on the intersections', 'Taking exactly three photos', 'Using three filters at once'], correct: 1 },
    { question: 'How does side lighting change a portrait compared to front lighting?', options: ['Side lighting creates dramatic half-shadow; front lighting is flat and even', 'Front lighting creates more shadows', 'Side lighting makes the subject invisible', 'There is no difference'], correct: 0 },
    { question: 'What are "layers" in digital painting?', options: ['Layers of paint on a canvas', 'Separate transparent sheets that allow you to work on different parts independently (line art, colors, shadows)', 'Different pages in a sketchbook', 'A type of digital brush'], correct: 1 },
    { question: 'What is a "silhouette" in photography?', options: ['A blurry photo', 'A dark outline of a subject created by backlighting', 'A close-up photo', 'A photo taken at night'], correct: 1 },
    { question: 'Why is media literacy important when viewing digital images?', options: ['Because all digital images are real', 'Because photographs and images can be easily altered or manipulated', 'To learn how to paint', 'To take better selfies'], correct: 1 }
  ],
  'May': [
    { question: 'Islamic geometric patterns use which tools to create complex designs?', options: ['Only a ruler', 'A compass and straightedge to create mathematically precise, symmetrical patterns', 'Freehand drawing only', 'Stencils'], correct: 1 },
    { question: 'What cultural significance does Kente cloth hold in West African tradition?', options: ['It is used for cooking', 'Colors and patterns have specific symbolic meanings related to history, values, and status', 'It is only worn for sports', 'It has no special meaning'], correct: 1 },
    { question: 'What are the key design elements of Pacific Northwest formline art?', options: ['Only straight lines and dots', 'Bold black outlines with red/blue accents using U-shapes, ovoids, and curving lines', 'Watercolor washes', 'Realistic shading'], correct: 1 },
    { question: 'What is a mosaic?', options: ['A type of painting using only water', 'An image or pattern created by assembling small pieces of colored material tightly together', 'A type of sculpture', 'A photographic technique'], correct: 1 },
    { question: 'In paper weaving, what do the "warp" and "weft" refer to?', options: ['The top and bottom of the paper', 'The vertical strips (warp) and horizontal strips (weft) woven over and under each other', 'Two types of glue', 'The colors used in the weaving'], correct: 1 }
  ],
  'June': [
    { question: 'When curating an art portfolio, what should you consider when selecting pieces?', options: ['Only the most recent work', 'Variety of skills, personal growth, and artistic merit', 'Only the biggest pieces', 'Whatever fits in the folder'], correct: 1 },
    { question: 'Why is matting artwork important for exhibition?', options: ['To make it heavier', 'It creates a clean, professional border that elevates the presentation', 'To change the colors', 'It is only for photographs'], correct: 1 },
    { question: 'What should an artist statement include?', options: ['A list of all your art supplies', 'Your artistic process, favorite mediums, challenges overcome, and what you hope viewers feel', 'Only your name and age', 'A price list for each piece'], correct: 1 },
    { question: 'What is a "tombstone label" in a gallery exhibition?', options: ['A label shaped like a tombstone', 'A card listing the Title, Artist Name, Date, and Medium of the artwork', 'A type of picture frame', 'A label with a review of the art'], correct: 1 },
    { question: 'What was your favorite art project this year -- or did you love them ALL?', options: ['Sculpture and clay building', 'Painting and color theory', 'Printmaking and graphic design', 'All of the above!'], correct: 3 }
  ]
},
'age-10-pe': {
  'September': [
    { question: 'Where can you find your pulse to measure your heart rate?', options: ['On your elbow', 'On your wrist or neck', 'On your knee', 'On your shoulder'], correct: 1 },
    { question: 'What does the "M" in SMART goals stand for?', options: ['Maximum', 'Measurable', 'Magical', 'Monthly'], correct: 1 },
    { question: 'What is the purpose of baseline fitness assessments?', options: ['To compare yourself to others', 'To establish a starting point so you can measure future improvement', 'To determine your grade', 'To find out who is the fastest'], correct: 1 },
    { question: 'What is aerobic exercise?', options: ['Stretching only', 'Sustained physical activity that raises your heart rate over an extended period', 'Lifting very heavy weights once', 'Sitting and breathing deeply'], correct: 1 },
    { question: 'If you count your heartbeats for 30 seconds and get 35 beats, what is your heart rate per minute?', options: ['35 bpm', '65 bpm', '70 bpm', '105 bpm'], correct: 2 }
  ],
  'October': [
    { question: 'When dribbling a soccer ball, what part of your foot should you primarily use?', options: ['Your toe', 'The inside and outside of your feet', 'Your heel', 'The bottom of your foot'], correct: 1 },
    { question: 'What is the proper technique for a soccer push pass?', options: ['Kicking with your toe', 'Using the inside of your foot to push the ball accurately to a teammate', 'Using your head', 'Throwing the ball with your hands'], correct: 1 },
    { question: 'When shooting a soccer ball for power, what part of your foot should strike the ball?', options: ['Your toe', 'Your instep (laces)', 'Your heel', 'The inside of your foot'], correct: 1 },
    { question: 'In soccer, what is the primary role of a defender?', options: ['To score goals', 'To prevent the opposing team from scoring by protecting the goal area', 'To pass to the goalie', 'To stand in one place'], correct: 1 },
    { question: 'Why is it important to keep the ball close to your body while dribbling?', options: ['So you can see it better', 'To maintain control and prevent defenders from easily taking it', 'Because the rules require it', 'So you do not trip over it'], correct: 1 }
  ],
  'November': [
    { question: 'What does BEEF stand for in basketball shooting?', options: ['Balance, Eyes, Elbow, Follow-through', 'Bounce, Extend, Elevate, Flick', 'Back, Energy, Effort, Focus', 'Bend, Execute, Evaluate, Finish'], correct: 0 },
    { question: 'When dribbling a basketball, why should you keep your eyes up?', options: ['To look at the referee', 'To see teammates, defenders, and the court instead of watching the ball', 'Because it is a rule', 'To show off'], correct: 1 },
    { question: 'What is a pivot in basketball?', options: ['A type of pass', 'Keeping one foot planted while moving the other to change direction without traveling', 'A fancy dribble move', 'Jumping as high as you can'], correct: 1 },
    { question: 'What is the proper defensive stance in basketball?', options: ['Standing tall with arms at your sides', 'Knees bent, back straight, hands active, staying between the player and the basket', 'Lying on the ground', 'Running in circles around the offense'], correct: 1 },
    { question: 'What is "boxing out" in basketball?', options: ['Punching an opponent', 'Positioning your body between an opponent and the basket to grab a rebound', 'Drawing a box on the court', 'A type of dribble'], correct: 1 }
  ],
  'December': [
    { question: 'When performing a forward roll, what is the most important safety rule?', options: ['Keep your legs straight', 'Tuck your chin to your chest to protect your neck', 'Keep your eyes open', 'Go as fast as possible'], correct: 1 },
    { question: 'What is an arabesque in gymnastics?', options: ['A type of cartwheel', 'A balance pose where one leg is extended straight back while standing on the other', 'A forward flip', 'A handstand'], correct: 1 },
    { question: 'Why should you NOT bounce when doing a static stretch?', options: ['Because it looks silly', 'Bouncing can cause muscle strain or injury; hold the stretch still instead', 'Because it makes you more flexible faster', 'Bouncing is actually recommended'], correct: 1 },
    { question: 'When choreographing a gymnastics routine, what elements should be combined?', options: ['Only jumps', 'Tumbling skills, balance holds, jumps, and smooth transitions', 'Only running', 'Whatever is easiest'], correct: 1 },
    { question: 'What are "animal walks" (bear crawl, crab walk) used for in gymnastics warmups?', options: ['Just for fun', 'To build core strength and body coordination', 'To practice balancing', 'To learn about real animals'], correct: 1 }
  ],
  'January': [
    { question: 'What are the three macronutrients your body needs?', options: ['Vitamins, minerals, and water', 'Carbohydrates, proteins, and fats', 'Sugar, salt, and iron', 'Calcium, fiber, and potassium'], correct: 1 },
    { question: 'On a nutrition label, what is the first thing you should check?', options: ['The brand name', 'The serving size', 'The picture on the front', 'The expiration date'], correct: 1 },
    { question: 'What is the Sun Salutation in yoga?', options: ['Looking at the sun', 'A basic sequence of poses linked with breath (Mountain, Forward Fold, Plank, Downward Dog)', 'Saying hello to the sun', 'A type of meditation'], correct: 1 },
    { question: 'How much sleep should a 5th grader (age 10) aim for each night?', options: ['5-6 hours', '7-8 hours', '9-11 hours', '12-14 hours'], correct: 2 },
    { question: 'What is "box breathing"?', options: ['Breathing into a box', 'Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, hold 4 seconds', 'Taking 4 deep breaths quickly', 'Holding your breath as long as possible'], correct: 1 }
  ],
  'February': [
    { question: 'When performing a volleyball forearm pass (bump), how should your hands be positioned?', options: ['Interlocked with thumbs crossed and arms flat', 'One hand on top of the other with thumbs pointing forward', 'Both fists clenched', 'Hands in your pockets'], correct: 1 },
    { question: 'What body parts should power a volleyball bump -- not just your arms?', options: ['Only your wrists', 'Your legs -- you bend and push upward through the platform', 'Your head', 'Your shoulders only'], correct: 1 },
    { question: 'What is the "shake hands" grip in racket sports?', options: ['Literally shaking hands before playing', 'Holding the racket as if shaking hands with it, for a neutral forehand grip', 'A type of serve', 'Switching hands during play'], correct: 1 },
    { question: 'In net games, why should you return to "home base" (center court) after every hit?', options: ['Because the rules say so', 'To be in the best position to reach the next shot wherever it goes', 'To take a break', 'To confuse your opponent'], correct: 1 },
    { question: 'What is the difference between a chest pass and a bounce pass?', options: ['A chest pass bounces; a bounce pass goes straight', 'A chest pass travels through the air from your chest; a bounce pass hits the ground first', 'They are the same pass', 'A chest pass is only for volleyball'], correct: 1 }
  ],
  'March': [
    { question: 'What is the correct arm motion during a sprint?', options: ['Arms crossed in front', '"Cheek to cheek" -- swinging from face level to back pocket level', 'Arms straight down', 'Arms waving side to side'], correct: 1 },
    { question: 'What part of your foot should you run on during a sprint?', options: ['Your heels', 'The balls of your feet (forefoot)', 'The sides of your feet', 'Flat footed'], correct: 1 },
    { question: 'What is the difference between aerobic and anaerobic exercise?', options: ['There is no difference', 'Aerobic is sustained endurance; anaerobic is short, intense bursts like sprints', 'Anaerobic is easier', 'Aerobic means no oxygen is used'], correct: 1 },
    { question: 'In a standing broad jump, what should you use to generate maximum distance?', options: ['Only your legs', 'Your arms for momentum, combined with a two-foot landing', 'Only your core', 'A running start is required'], correct: 1 },
    { question: 'In the shot put, what type of motion should you use?', options: ['Throwing it like a baseball', 'A pushing motion from the neck area', 'Kicking it with your foot', 'Dropping it from above your head'], correct: 1 }
  ],
  'April': [
    { question: 'In music and dance, what is an 8-count?', options: ['Counting to 8 very slowly', 'A grouping of 8 beats that forms the basic unit of dance phrasing', 'A type of dance move', '8 different dance steps'], correct: 1 },
    { question: 'What is a grapevine in dance?', options: ['A type of plant', 'A step pattern where you step side, cross behind, step side, cross in front', 'A dance done only in circles', 'A slow waltz step'], correct: 1 },
    { question: 'Why is it valuable to learn cultural and folk dances from different traditions?', options: ['It is not valuable', 'Dance is a form of cultural expression and storytelling that teaches about other cultures', 'To memorize facts about countries', 'Because it is easier than modern dance'], correct: 1 },
    { question: 'When choreographing your own dance routine, what should you focus on?', options: ['Copying a famous dancer exactly', 'Changing levels (high/low), directions, and creating smooth transitions between moves', 'Doing the easiest moves possible', 'Standing still and posing'], correct: 1 },
    { question: 'What does "freeze dance" help you practice?', options: ['Only having fun', 'Body control, rhythm awareness, and the ability to stop on cue', 'Running speed', 'Vocal projection'], correct: 1 }
  ],
  'May': [
    { question: 'What does "Leave No Trace" mean when hiking?', options: ['Do not look at any animals', 'Leave the trail as you found it -- carry out all trash and minimize your impact', 'Do not leave the marked trail ever', 'Do not tell anyone where you hiked'], correct: 1 },
    { question: 'How does a compass work?', options: ['It points to the nearest mountain', 'The magnetized needle always points toward magnetic north ("red in the shed")', 'It measures temperature', 'It tells you the time'], correct: 1 },
    { question: 'When hiking on an incline, how should you adjust your pace?', options: ['Speed up to get it over with', 'Take shorter steps and maintain a steady pace to conserve energy', 'Run up the hill', 'Stop completely'], correct: 1 },
    { question: 'What is the proper technique for lifting heavy objects?', options: ['Bend at your waist and pull up', 'Bend your knees, keep your back straight, and lift with your legs', 'Use only your arms', 'Drag it on the ground'], correct: 1 },
    { question: 'What is the purpose of an orienteering course?', options: ['To run as fast as possible', 'To navigate from point to point using a compass and pace counting', 'To climb trees', 'To find buried treasure'], correct: 1 }
  ],
  'June': [
    { question: 'Why do you re-take baseline fitness tests at the end of the year?', options: ['Because you forgot the first time', 'To measure your growth and improvement over the school year', 'To punish yourself', 'The teacher needs the data'], correct: 1 },
    { question: 'What is good sportsmanship during competition?', options: ['Only caring about winning', 'Trying your best, cheering for others, and shaking hands regardless of the outcome', 'Arguing with the referee', 'Showing off after every play'], correct: 1 },
    { question: 'When playing a full game of a sport, what should you focus on besides scoring?', options: ['Nothing else matters', 'Applying strategy, following rules, fair play, and teamwork', 'Looking good while playing', 'Talking to the audience'], correct: 1 },
    { question: 'What should a "Summer Action Plan" include?', options: ['A list of video games to play', 'At least 3 active hobbies or exercises to stay fit over the break', 'A list of TV shows to watch', 'Plans to sleep all day'], correct: 1 },
    { question: 'What was your favorite PE activity this year -- or did you love ALL of them?', options: ['Soccer and basketball', 'Track and field events', 'Gymnastics and dance', 'All of the above!'], correct: 3 }
  ]
}
,

'ages-11-12-math': {
  'September': [
    { question: 'A fruit basket has 4 apples and 6 oranges. Which of the following is NOT a correct way to write the ratio of apples to oranges?', options: ['4:6', '4 to 6', '4/6', '6:4'], correct: 3 },
    { question: 'If a recipe calls for 2 cups of flour for every 3 cups of sugar, how much sugar do you need for 8 cups of flour?', options: ['9 cups', '10 cups', '12 cups', '6 cups'], correct: 2 },
    { question: 'At a store, 5 notebooks cost $7.50. What is the unit price per notebook?', options: ['$0.50', '$1.25', '$1.50', '$2.50'], correct: 2 },
    { question: 'A map has a scale of 1 inch = 5 miles. If two cities are 3.5 inches apart on the map, how many miles apart are they in reality?', options: ['15 miles', '17.5 miles', '8.5 miles', '20 miles'], correct: 1 },
    { question: 'Which tool would be MOST helpful for visualizing equivalent ratios between two quantities?', options: ['A pie chart', 'A double number line', 'A box plot', 'A scatter plot'], correct: 1 }
  ],
  'October': [
    { question: 'Using "keep-change-flip," what is 2/3 divided by 1/6?', options: ['1/9', '4', '3', '12/3'], correct: 1 },
    { question: 'What is 432 divided by 18?', options: ['22', '23', '24', '26'], correct: 2 },
    { question: 'Bus A returns every 4 hours and Bus B returns every 6 hours. If they both leave together, after how many hours will they both be back at the station at the same time?', options: ['10 hours', '12 hours', '24 hours', '8 hours'], correct: 1 },
    { question: 'Using the distributive property, how can you rewrite 36 + 8?', options: ['2(18 + 4)', '4(9 + 2)', '8(4 + 1)', '6(6 + 2)'], correct: 1 },
    { question: 'What is the greatest common factor (GCF) of 24 and 36?', options: ['6', '8', '12', '4'], correct: 2 }
  ],
  'November': [
    { question: 'The temperature was -5 degrees F and rose 8 degrees. What is the new temperature?', options: ['13 degrees F', '3 degrees F', '-3 degrees F', '-13 degrees F'], correct: 1 },
    { question: 'What is the absolute value of -7?', options: ['-7', '7', '0', '-1/7'], correct: 1 },
    { question: 'In which quadrant of the coordinate plane is the point (-3, 5) located?', options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], correct: 1 },
    { question: 'If point (2, 4) is reflected across the y-axis, what are the coordinates of the reflected point?', options: ['(-2, 4)', '(2, -4)', '(-2, -4)', '(-4, 2)'], correct: 0 },
    { question: 'A hiker walks from (-2, 4) to (3, 4) on a coordinate grid. How far did they walk?', options: ['1 unit', '5 units', '7 units', '3 units'], correct: 1 }
  ],
  'December': [
    { question: 'Translate into an algebraic expression: "5 more than a number n."', options: ['5n', 'n - 5', 'n + 5', '5/n'], correct: 2 },
    { question: 'Evaluate: 2 x (3 + 4 squared) - 5 = ?', options: ['55', '51', '47', '59'], correct: 1 },
    { question: 'Simplify the expression: 4x + 3y + 2x - y', options: ['6x + 2y', '6x + 4y', '8xy', '6x + y'], correct: 0 },
    { question: 'A plumber charges $50 plus $35 per hour. Which expression represents the total cost for h hours?', options: ['50h + 35', '35h + 50', '85h', '50 + 35/h'], correct: 1 },
    { question: 'Which property allows you to rewrite 3(x + 4) as 3x + 12?', options: ['Commutative property', 'Associative property', 'Distributive property', 'Identity property'], correct: 2 }
  ],
  'January': [
    { question: 'Is x = 4 a solution to the equation 2x + 1 = 9?', options: ['Yes', 'No, x = 3', 'No, x = 5', 'No, x = 2'], correct: 0 },
    { question: 'Solve for x: x + 7 = 15', options: ['x = 22', 'x = 7', 'x = 8', 'x = 2'], correct: 2 },
    { question: 'Solve for x: 3x + 4 = 19', options: ['x = 3', 'x = 5', 'x = 7', 'x = 4'], correct: 1 },
    { question: 'You must be at least 12 years old to ride the roller coaster. Which inequality represents this?', options: ['x < 12', 'x > 12', 'x >= 12', 'x <= 12'], correct: 2 },
    { question: 'On a number line, an open circle is used for which type of inequality symbol?', options: ['<= or >=', '< or >', '= only', 'All symbols'], correct: 1 }
  ],
  'February': [
    { question: 'What is the area of a triangle with a base of 10 and a height of 6?', options: ['60 square units', '30 square units', '16 square units', '36 square units'], correct: 1 },
    { question: 'An L-shaped figure can be decomposed into two rectangles measuring 8x5 and 4x3. What is the total area?', options: ['40 square units', '52 square units', '12 square units', '60 square units'], correct: 1 },
    { question: 'A cube has a side length of 4 units. What is its surface area?', options: ['16 square units', '48 square units', '64 square units', '96 square units'], correct: 3 },
    { question: 'What is the volume of a rectangular prism with dimensions 3.5 x 2 x 4?', options: ['28 cubic units', '9.5 cubic units', '24 cubic units', '14 cubic units'], correct: 0 },
    { question: 'A net is shown that has 6 identical square faces. What 3D shape does it fold into?', options: ['Rectangular prism', 'Cube', 'Square pyramid', 'Triangular prism'], correct: 1 }
  ],
  'March': [
    { question: 'Which of the following is a statistical question?', options: ['How old am I?', 'What is 2 + 2?', 'How many hours of sleep do students in my class get?', 'What color is my car?'], correct: 2 },
    { question: 'Find the mean of: 5, 7, 9, 11', options: ['7', '8', '9', '32'], correct: 1 },
    { question: 'Two classes have the same mean test score of 80. Class A scores are 78, 80, 82 and Class B scores are 60, 80, 100. Which class is more consistent?', options: ['Class A', 'Class B', 'Both are equally consistent', 'Cannot be determined'], correct: 0 },
    { question: 'A box plot shows the five-number summary. Which values mark the edges of the "box"?', options: ['Min and Max', 'Q1 and Q3', 'Mean and Median', 'Q1 and Median'], correct: 1 },
    { question: 'What does MAD stand for in data analysis?', options: ['Maximum Absolute Deviation', 'Mean Absolute Deviation', 'Median Absolute Difference', 'Mode Average Distance'], correct: 1 }
  ],
  'April': [
    { question: 'Convert 0.75 to a percent and a fraction.', options: ['75% and 3/4', '7.5% and 3/4', '75% and 7/10', '0.75% and 3/4'], correct: 0 },
    { question: 'What is 15% of 80?', options: ['8', '10', '12', '15'], correct: 2 },
    { question: 'A $50 shirt is on sale for 25% off. What is the sale price?', options: ['$25.00', '$37.50', '$35.00', '$40.00'], correct: 1 },
    { question: 'A blueprint shows a room as 4 inches x 3 inches with a scale of 1 inch = 2 feet. What is the actual area of the room?', options: ['12 square feet', '24 square feet', '48 square feet', '6 square feet'], correct: 2 },
    { question: '45 is what percent of 90?', options: ['45%', '40%', '50%', '55%'], correct: 2 }
  ],
  'May': [
    { question: 'If you buy apples at $2 per pound, which variable is the dependent variable?', options: ['Price per pound', 'Number of pounds', 'Total cost', 'Type of apple'], correct: 2 },
    { question: 'Given the table x = 1, 2, 3 and y = 3, 6, 9, which equation describes the relationship?', options: ['y = x + 2', 'y = 3x', 'y = x squared', 'y = 2x + 1'], correct: 1 },
    { question: 'In the equation c = 30h + 50, what does the 50 represent?', options: ['The cost per hour', 'The initial/fixed charge', 'The number of hours', 'The total cost'], correct: 1 },
    { question: 'On a distance-time graph, a steeper slope indicates what?', options: ['Slower speed', 'Faster speed', 'The object stopped', 'The object turned around'], correct: 1 },
    { question: 'Plan A costs $20 + $0.10 per text. Plan B costs $0.25 per text. Which is cheaper for 100 texts?', options: ['Plan A ($30)', 'Plan B ($25)', 'They cost the same', 'Plan A ($20.10)'], correct: 0 }
  ],
  'June': [
    { question: 'Which operation do you use to find a unit rate from any given ratio?', options: ['Addition', 'Multiplication', 'Division', 'Subtraction'], correct: 2 },
    { question: 'Solve: 2x + 5 = 17', options: ['x = 6', 'x = 4', 'x = 7', 'x = 11'], correct: 0 },
    { question: 'Given data: 12, 15, 18, 22, 25, 30, what is the median?', options: ['18', '20', '22', '21'], correct: 1 },
    { question: 'What is the formula for the volume of a rectangular prism?', options: ['l + w + h', '2(lw + lh + wh)', 'l x w x h', '1/2 x b x h'], correct: 2 },
    { question: 'Looking back at the whole year of math, which topics did we study?', options: ['Ratios, expressions, geometry, statistics', 'Only addition and subtraction', 'Calculus and trigonometry', 'All of the above!'], correct: 0 }
  ]
},
'ages-11-12-english': {
  'September': [
    { question: 'What are the five key story elements covered in fiction?', options: ['Plot, character, setting, conflict, resolution', 'Introduction, body, conclusion, thesis, evidence', 'Theme, tone, mood, style, voice', 'Characters, dialogue, narration, climax, ending'], correct: 0 },
    { question: 'When tracking character development, what should you look for?', options: ['The number of pages the character appears on', 'Beginning traits, key events, and ending traits', 'Only the character name and age', 'The number of dialogue lines'], correct: 1 },
    { question: 'How does an author create mood in a story?', options: ['By using descriptive language and sensory details', 'By making the story very short', 'By using only dialogue', 'By listing facts'], correct: 0 },
    { question: 'What is third person omniscient narration?', options: ['The narrator is a character using "I"', 'The narrator uses "he/she" and knows every character thoughts', 'The narrator uses "he/she" but knows only one character', 'The narrator speaks directly to the reader'], correct: 1 },
    { question: 'Rewriting a scene from the villain first-person perspective is an example of changing what?', options: ['The genre', 'The point of view', 'The setting', 'The conflict type'], correct: 1 }
  ],
  'October': [
    { question: 'A theme should be stated as:', options: ['A single word like "love"', 'A complete sentence expressing a universal message', 'A question', 'The title of the story'], correct: 1 },
    { question: '"The rain danced on the rooftop" is an example of which figurative language?', options: ['Simile', 'Hyperbole', 'Personification', 'Metaphor'], correct: 2 },
    { question: 'In "The Outsiders," the greaser hair represents more than just a hairstyle. This makes it a:', options: ['Metaphor', 'Simile', 'Symbol', 'Hyperbole'], correct: 2 },
    { question: 'Which author purpose is associated with an advertisement?', options: ['To entertain', 'To inform', 'To persuade', 'To describe'], correct: 2 },
    { question: 'What is the difference between a simile and a metaphor?', options: ['A simile is longer than a metaphor', 'A simile uses "like" or "as"; a metaphor does not', 'A metaphor uses "like" or "as"; a simile does not', 'There is no difference'], correct: 1 }
  ],
  'November': [
    { question: 'In the CEW writing model, what does the "W" stand for?', options: ['Word count', 'Writing style', 'Warrant (how evidence proves the claim)', 'Weakness'], correct: 2 },
    { question: 'What does MLA stand for in citation format?', options: ['Main Language Arts', 'Modern Language Association', 'Multiple Literary Analysis', 'Media Literacy Assessment'], correct: 1 },
    { question: 'Why is it important to address a counterargument in an essay?', options: ['It makes the essay longer', 'It shows you understand the opposing view and strengthens your position', 'Your teacher requires it', 'It replaces the need for evidence'], correct: 1 },
    { question: 'Which is a strong conclusion strategy?', options: ['Start with "In conclusion"', 'Simply repeat the introduction word for word', 'Connect to a bigger picture or end with a call to action', 'Introduce a brand-new argument'], correct: 2 },
    { question: 'Which signal phrase correctly embeds a quote using MLA format?', options: ['And then Smith said stuff about it', 'According to Smith, "the data shows a clear trend" (23).', '"The data shows a clear trend" said Smith page 23.', 'Smith writes that the data shows stuff'], correct: 1 }
  ],
  'December': [
    { question: 'What is alliteration?', options: ['Words that imitate sounds', 'Repeated consonant sounds at the beginning of words', 'A comparison using "like" or "as"', 'Exaggeration for effect'], correct: 1 },
    { question: 'A Shakespearean sonnet has how many lines and what rhyme scheme?', options: ['12 lines, AABBCCDDEEFF', '14 lines, ABABCDCDEFEFGG', '8 lines, ABABCDCD', '16 lines, AABBCCDDEEFFGGHH'], correct: 1 },
    { question: 'Free verse poetry is characterized by:', options: ['Strict rhyme and meter', 'No rhyme or fixed meter, relying on natural rhythm', 'Exactly 14 lines', 'Only using onomatopoeia'], correct: 1 },
    { question: 'In spoken word performance, which element enhances meaning beyond the written words?', options: ['Using bigger paper', 'Voice, pacing, volume, and pauses', 'Adding more rhyme', 'Writing in cursive'], correct: 1 },
    { question: 'Sensory imagery in poetry appeals to which of the following?', options: ['Only sight and sound', 'Sight, sound, smell, touch, and taste', 'Only emotions', 'Logic and reasoning'], correct: 1 }
  ],
  'January': [
    { question: 'Which text structure uses signal words like "because," "as a result," and "therefore"?', options: ['Compare/contrast', 'Problem/solution', 'Cause/effect', 'Chronological'], correct: 2 },
    { question: 'What is the difference between the main idea and a supporting detail?', options: ['They are the same thing', 'The main idea is the big picture; a detail is a specific fact that supports it', 'A detail is more important than the main idea', 'The main idea is always the first sentence'], correct: 1 },
    { question: 'In Cornell notes, what goes in the left "Cue Column"?', options: ['Detailed notes from the text', 'Key terms and questions', 'The summary', 'Doodles and drawings'], correct: 1 },
    { question: 'What is the difference between summarizing and paraphrasing?', options: ['They are identical processes', 'Summarizing gives main points in fewer words; paraphrasing restates a specific passage in your own words', 'Paraphrasing is shorter than the original', 'Summarizing uses direct quotes'], correct: 1 },
    { question: 'Why is plagiarism a serious issue in writing?', options: ['It makes your paper too long', 'It is using someone else work without giving credit, which is dishonest', 'Teachers can always tell', 'It only applies to books, not websites'], correct: 1 }
  ],
  'February': [
    { question: 'In a formal debate, what does the "proposition" side do?', options: ['Ask questions only', 'Argue against the topic', 'Argue in favor of the topic', 'Keep time'], correct: 2 },
    { question: 'What should an evidence card include?', options: ['Just the quote', 'Source, quote/fact, and how it supports your argument', 'Only your opinion', 'The debate rules'], correct: 1 },
    { question: 'What is a rebuttal in a debate?', options: ['The opening statement', 'A response that specifically addresses the opponent arguments', 'A summary of your own points', 'The score sheet'], correct: 1 },
    { question: 'Which of these is evaluated in a debate scoring rubric?', options: ['Handwriting quality', 'Clarity of claim, quality of evidence, and rebuttal effectiveness', 'How loud you speak', 'The number of sources you read'], correct: 1 },
    { question: 'What makes a strong opening statement in a debate?', options: ['Starting with a joke', 'A clear claim supported by evidence', 'Reading from a textbook', 'Disagreeing with everything the other side said'], correct: 1 }
  ],
  'March': [
    { question: 'What is a character arc?', options: ['The order characters are introduced', 'How a character changes over the course of a story', 'The physical description of a character', 'The list of characters in a novel'], correct: 1 },
    { question: 'Which conflict type involves a character struggling with their own fears or doubts?', options: ['Person vs. Person', 'Person vs. Nature', 'Person vs. Self', 'Person vs. Society'], correct: 2 },
    { question: 'When reading a novel, making predictions is a strategy that helps you:', options: ['Finish the book faster', 'Engage actively with the text and think about what might happen', 'Skip chapters', 'Memorize the characters names'], correct: 1 },
    { question: 'A novel theme should be supported by:', options: ['Your personal opinion only', 'At least three pieces of evidence from across the book', 'The back cover summary', 'One quote from the first chapter'], correct: 1 },
    { question: 'Which of these is a realistic fiction novel mentioned in the curriculum for this novel study unit?', options: ['Harry Potter', 'The Giver or Hatchet', 'The Cat in the Hat', 'The Great Gatsby'], correct: 1 }
  ],
  'April': [
    { question: 'What is the difference between an independent clause and a dependent clause?', options: ['An independent clause can stand alone; a dependent clause cannot', 'A dependent clause is longer', 'An independent clause always comes first', 'They are the same thing'], correct: 0 },
    { question: 'Why is sentence variety important in writing?', options: ['It makes the essay longer', 'It creates rhythm, emphasis, and improves readability', 'Teachers prefer it', 'It replaces the need for punctuation'], correct: 1 },
    { question: 'In the sentence "Let\'s eat, Grandma," the comma serves which rule?', options: ['Items in a list', 'Separating independent clauses', 'Introductory phrase', 'Direct address / non-essential information'], correct: 3 },
    { question: 'Read: "The dog chased the cat because it was hungry." What is the problem with this sentence?', options: ['The comma is missing', 'The pronoun "it" is ambiguous; it could refer to the dog or the cat', 'The verb tense is wrong', 'There is no problem'], correct: 1 },
    { question: 'A compound sentence contains:', options: ['One independent clause', 'Two or more independent clauses joined by a conjunction', 'One independent and one dependent clause', 'Only dependent clauses'], correct: 1 }
  ],
  'May': [
    { question: 'When reading literature from a different culture, what should you research before reading?', options: ['The author shoe size', 'The cultural context to understand references and values', 'How much the book costs', 'The number of pages'], correct: 1 },
    { question: 'What is bias in a text?', options: ['A spelling error', 'A preference that prevents impartial judgment', 'A type of poem', 'A reading strategy'], correct: 1 },
    { question: 'When comparing two texts from different cultures on the same theme, a Venn diagram helps you:', options: ['Count the number of characters', 'Identify similarities and differences between the texts', 'Find the main idea of only one text', 'Write a summary'], correct: 1 },
    { question: 'A personal narrative should include which of the following?', options: ['A bibliography', 'Sensory details, dialogue, and a clear narrative arc', 'Only facts and statistics', 'A counterargument paragraph'], correct: 1 },
    { question: 'Retelling the story of the Three Little Pigs from the wolf perspective changes what?', options: ['The conflict type', 'The point of view and potentially our sympathy', 'The genre', 'Nothing at all'], correct: 1 }
  ],
  'June': [
    { question: 'When revising a portfolio piece, what should you check first?', options: ['The font size', 'Whether the thesis or main idea is clear', 'The color of the paper', 'How many pages it is'], correct: 1 },
    { question: 'A reflective introduction letter should include:', options: ['A list of every assignment from the year', 'Who you were as a writer in September, areas of growth, and goals for next year', 'Only your grades', 'A summary of your favorite TV show'], correct: 1 },
    { question: 'When presenting your writing to an audience, which delivery skill matters most?', options: ['Reading as fast as possible', 'Eye contact, volume, pace, and posture', 'Using the biggest words possible', 'Memorizing every word perfectly'], correct: 1 },
    { question: 'What is the purpose of a final writing portfolio?', options: ['To show only your weakest work', 'To showcase your best revised pieces and reflect on your growth as a reader and writer', 'To collect all your rough drafts', 'To compare yourself to other students'], correct: 1 },
    { question: 'What skills did you practice this year in English class?', options: ['Only grammar worksheets', 'Literature analysis, essay writing, poetry, debate, and research', 'Only reading novels', 'All of the above!'], correct: 3 }
  ]
},
'ages-11-12-science': {
  'September': [
    { question: 'What are the steps of the scientific method in order?', options: ['Hypothesis, question, experiment, data, conclusion', 'Question, hypothesis, experiment, data, conclusion', 'Conclusion, experiment, data, question, hypothesis', 'Data, question, experiment, hypothesis, conclusion'], correct: 1 },
    { question: 'In an experiment testing which paper towel brand absorbs the most water, what is the dependent variable?', options: ['The brand of paper towel', 'The amount of water absorbed', 'The size of the towel sheet', 'The time soaked'], correct: 1 },
    { question: 'What is the mean (average) of these reaction times in cm: 12, 15, 14, 13, 11?', options: ['13', '12', '14', '15'], correct: 0 },
    { question: 'What is the first step in the engineering design process?', options: ['Build a prototype', 'Define the problem', 'Test the solution', 'Present results'], correct: 1 },
    { question: 'A valid scientific hypothesis should be written in what format?', options: ['As a question', 'As a fact', 'As an "If...then...because..." statement', 'As a list of materials'], correct: 2 }
  ],
  'October': [
    { question: 'What are the three main types of rocks in the rock cycle?', options: ['Igneous, sedimentary, metamorphic', 'Granite, marble, obsidian', 'Volcanic, oceanic, continental', 'Hard, soft, medium'], correct: 0 },
    { question: 'Which test determines a mineral hardness by scratching it against known materials?', options: ['Streak test', 'Luster test', 'Mohs hardness test', 'Acid test'], correct: 2 },
    { question: 'What type of plate boundary occurs when two plates pull apart, creating new crust?', options: ['Convergent', 'Transform', 'Divergent', 'Subduction'], correct: 2 },
    { question: 'Where are most of the world earthquakes and volcanoes located?', options: ['Along the equator', 'In the middle of continents', 'Around the Ring of Fire (Pacific Plate boundaries)', 'Only in the ocean'], correct: 2 },
    { question: 'The supercontinent that existed when all continents were joined together is called:', options: ['Pangaea', 'Gondwanaland', 'Atlantis', 'Laurasia'], correct: 0 }
  ],
  'November': [
    { question: 'What process do plants use to release water vapor from their leaves?', options: ['Evaporation', 'Condensation', 'Transpiration', 'Precipitation'], correct: 2 },
    { question: 'When a cold air mass pushes under a warm air mass, this creates a:', options: ['High pressure system', 'Cold front, often bringing storms', 'Warm front with clear skies', 'Stationary front'], correct: 1 },
    { question: 'A barometer measures:', options: ['Wind speed', 'Temperature', 'Atmospheric pressure', 'Humidity'], correct: 2 },
    { question: 'What is the key difference between weather and climate?', options: ['They are the same thing', 'Weather is short-term; climate is long-term average conditions', 'Climate changes daily; weather is constant', 'Weather only involves temperature'], correct: 1 },
    { question: 'Why is it warmer at the equator than at the poles?', options: ['The equator is closer to the sun', 'Sunlight hits the equator directly; at the poles it hits at an angle, spreading out the energy', 'The equator has more clouds', 'The poles have more water'], correct: 1 }
  ],
  'December': [
    { question: 'What causes the seasons on Earth?', options: ['Earth distance from the sun', 'The tilt of Earth axis as it orbits the sun', 'The moon gravitational pull', 'Solar flares'], correct: 1 },
    { question: 'What keeps planets in orbit around the sun?', options: ['Magnetic fields', 'A balance of forward momentum and gravitational pull', 'Air resistance', 'Electrical charge'], correct: 1 },
    { question: 'If the sun is at the start of a toilet paper solar system, which planet is about 76 sheets away?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], correct: 3 },
    { question: 'What is the correct life cycle sequence for an average star like our Sun?', options: ['Nebula, red giant, protostar, white dwarf', 'Nebula, protostar, average star, red giant, white dwarf', 'White dwarf, red giant, average star, nebula', 'Protostar, black hole, nebula, supernova'], correct: 1 },
    { question: 'What galaxy do we live in?', options: ['Andromeda', 'The Milky Way', 'The Triangulum', 'The Big Dipper'], correct: 1 }
  ],
  'January': [
    { question: 'Which of the following is an abiotic factor in an ecosystem?', options: ['A tree', 'Sunlight', 'A rabbit', 'A mushroom'], correct: 1 },
    { question: 'In the 10% rule of energy transfer, if grass starts with 10,000 units of energy, how much energy does the hawk (tertiary consumer) receive?', options: ['1,000 units', '100 units', '10 units', '1 unit'], correct: 2 },
    { question: 'What is "carrying capacity"?', options: ['How much weight an animal can carry', 'The maximum population size an environment can support', 'The speed at which animals reproduce', 'The number of predators in an area'], correct: 1 },
    { question: 'In an oil spill clean-up lab, why is it so difficult to fully clean the water and feathers?', options: ['Oil dissolves in water', 'Oil and water mix well', 'Oil sticks to feathers and spreads, making complete removal nearly impossible', 'The tools are not strong enough'], correct: 2 },
    { question: 'Which organism in a food web breaks down dead matter and returns nutrients to the soil?', options: ['Producer', 'Consumer', 'Decomposer', 'Herbivore'], correct: 2 }
  ],
  'February': [
    { question: 'What are the three parts of Cell Theory?', options: ['Cells are small, cells divide, cells have membranes', 'All living things are made of cells, cells are the basic unit of life, all cells come from other cells', 'Cells have DNA, cells reproduce, cells grow', 'Cells have nuclei, cells have walls, cells have chloroplasts'], correct: 1 },
    { question: 'Which organelle is the "powerhouse" of the cell, producing energy?', options: ['Nucleus', 'Chloroplast', 'Mitochondria', 'Ribosome'], correct: 2 },
    { question: 'What is the correct order of body organization?', options: ['Organism, system, organ, tissue, cell', 'Cell, tissue, organ, organ system, organism', 'System, cell, organ, tissue, organism', 'Tissue, cell, organ, system, organism'], correct: 1 },
    { question: 'What are the inputs (reactants) of photosynthesis?', options: ['Glucose and oxygen', 'Carbon dioxide, water, and sunlight', 'Oxygen and glucose', 'Carbon dioxide and glucose'], correct: 1 },
    { question: 'How are photosynthesis and cellular respiration related?', options: ['They are the same process', 'The products of one are the reactants of the other', 'They happen in the same organelle', 'They both produce carbon dioxide'], correct: 1 }
  ],
  'March': [
    { question: 'In which state of matter do particles vibrate in place but stay in a fixed arrangement?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correct: 0 },
    { question: 'What subatomic particle determines the element (atomic number)?', options: ['Neutron', 'Electron', 'Proton', 'Nucleus'], correct: 2 },
    { question: 'When baking soda and vinegar react in a sealed bag, the mass before and after the reaction should be:', options: ['Greater after the reaction', 'Less after the reaction', 'Exactly the same (Law of Conservation of Mass)', 'Impossible to measure'], correct: 2 },
    { question: 'What type of mixture is a glass of Kool-Aid, where the components are evenly distributed?', options: ['Heterogeneous', 'Homogeneous (a solution)', 'Suspension', 'Colloid'], correct: 1 },
    { question: 'Which separation technique would use a magnet?', options: ['Distillation', 'Filtration', 'Removing iron filings from sand', 'Chromatography'], correct: 2 }
  ],
  'April': [
    { question: 'Which of Newton laws explains why a tablecloth can be pulled out from under dishes without moving them?', options: ['First law (inertia)', 'Second law (F=ma)', 'Third law (action/reaction)', 'Law of gravity'], correct: 0 },
    { question: 'What is the formula for calculating speed?', options: ['Speed = Time / Distance', 'Speed = Distance x Time', 'Speed = Distance / Time', 'Speed = Force / Mass'], correct: 2 },
    { question: 'At the highest point of a pendulum swing, what type of energy is at its maximum?', options: ['Kinetic energy', 'Potential energy', 'Thermal energy', 'Chemical energy'], correct: 1 },
    { question: 'What are the three methods of heat transfer?', options: ['Hot, warm, cold', 'Radiation, absorption, reflection', 'Conduction, convection, radiation', 'Melting, freezing, boiling'], correct: 2 },
    { question: 'According to Newton third law, when you push against a wall, what happens?', options: ['Nothing happens', 'The wall pushes back on you with equal force', 'Only you experience force', 'The wall moves'], correct: 1 }
  ],
  'May': [
    { question: 'Which of the following is a renewable resource?', options: ['Coal', 'Natural gas', 'Solar energy', 'Petroleum'], correct: 2 },
    { question: 'In the earthquake-resistant engineering lab, what geometric shape was added for stability?', options: ['Squares', 'Circles', 'Triangles (cross-bracing)', 'Pentagons'], correct: 2 },
    { question: 'What does the greenhouse effect do?', options: ['Cools the Earth', 'Traps heat in the atmosphere, warming the planet', 'Creates oxygen', 'Blocks sunlight entirely'], correct: 1 },
    { question: 'In the water filtration challenge, which layer should be at the bottom for the finest filtration?', options: ['Gravel', 'Sand', 'Cotton balls or coffee filter', 'Dirt'], correct: 2 },
    { question: 'Why are natural resources unevenly distributed around the world?', options: ['They are randomly placed', 'Geological history determines where resources formed', 'Countries with more money have more resources', 'Resources are the same everywhere'], correct: 1 }
  ],
  'June': [
    { question: 'What makes a good science fair project question?', options: ['It can be answered with a yes or no', 'It is testable with independent and dependent variables', 'It only requires reading a book', 'It is about a volcano model'], correct: 1 },
    { question: 'Why should you conduct multiple trials in an experiment?', options: ['To fill up your data table', 'To ensure reliability and identify outliers', 'Because the teacher said so', 'To make the experiment last longer'], correct: 1 },
    { question: 'On a science fair display board, where should the conclusion go?', options: ['In the center', 'At the very top', 'Near the end, after data and graphs', 'On the back'], correct: 2 },
    { question: 'In your science portfolio reflection, what should you discuss?', options: ['Only your grades', 'Favorite topic, most difficult concept mastered, and how your view of science changed', 'A list of all your friends in class', 'Only what you plan to do next year'], correct: 1 },
    { question: 'What scientific domains did you explore this year?', options: ['Only biology', 'Earth science, life science, physical science, and engineering', 'Just chemistry experiments', 'All of the above!'], correct: 3 }
  ]
},
'ages-11-12-art': {
  'September': [
    { question: 'In blind contour drawing, where should your eyes be focused?', options: ['On the paper', 'On the subject only, never the paper', 'On your hand', 'Closed'], correct: 1 },
    { question: 'What are the five elements of light and shadow on a sphere?', options: ['Top, bottom, left, right, center', 'Highlight, midtone, core shadow, cast shadow, reflected light', 'Light, medium, dark, very dark, black', 'Sun, shade, glow, dim, dark'], correct: 1 },
    { question: 'In classical facial proportions, where do the eyes fall on the head?', options: ['Near the top of the head', 'About one-third down from the top', 'At the halfway point of the head', 'Near the chin'], correct: 2 },
    { question: 'In one-point perspective, what do all depth lines converge toward?', options: ['The edge of the paper', 'A single vanishing point', 'The top of the page', 'Multiple vanishing points'], correct: 1 },
    { question: 'Which shading technique uses intersecting parallel lines to create darker values?', options: ['Stippling', 'Hatching', 'Cross-hatching', 'Smudging'], correct: 2 }
  ],
  'October': [
    { question: 'How many sections does a complete color wheel with primary, secondary, and tertiary colors have?', options: ['6', '8', '10', '12'], correct: 3 },
    { question: 'What happens when you sprinkle salt on wet watercolor paint?', options: ['Nothing happens', 'It creates a textured, speckled resist pattern', 'It dissolves the paint', 'It makes the paint darker'], correct: 1 },
    { question: 'A monochromatic landscape uses what to create atmospheric perspective?', options: ['Many different colors', 'Values of a single color, with lighter values in the distance', 'Only black and white', 'Random color choices'], correct: 1 },
    { question: 'Analogous colors are colors that:', options: ['Are opposite each other on the color wheel', 'Are next to each other on the color wheel', 'Are only warm colors', 'Have no relationship'], correct: 1 },
    { question: 'What is a "graded wash" in watercolor?', options: ['A flat, even layer of one color', 'A transition from dark to light in a single color', 'Splashing paint randomly', 'Using only dry brush'], correct: 1 }
  ],
  'November': [
    { question: 'The grid method, used by Da Vinci, helps artists:', options: ['Mix colors accurately', 'Accurately enlarge and copy a complex image', 'Draw faster', 'Choose better colors'], correct: 1 },
    { question: 'What is chiaroscuro, as practiced by Caravaggio?', options: ['Using only bright colors', 'A technique of dramatic contrast between light and dark', 'Painting on wet plaster', 'Drawing with charcoal only'], correct: 1 },
    { question: 'A fresco is created by painting on what surface?', options: ['Canvas', 'Wet plaster', 'Dry paper', 'Wood panel'], correct: 1 },
    { question: 'The four steps of art critique in order are:', options: ['Evaluate, interpret, analyze, describe', 'Describe, analyze, interpret, evaluate', 'Interpret, describe, evaluate, analyze', 'Analyze, evaluate, describe, interpret'], correct: 1 },
    { question: 'Which Renaissance artist painted the ceiling of the Sistine Chapel?', options: ['Leonardo da Vinci', 'Caravaggio', 'Michelangelo', 'Raphael'], correct: 2 }
  ],
  'December': [
    { question: 'How many beats does a quarter note receive?', options: ['4 beats', '2 beats', '1 beat', '1/2 beat'], correct: 2 },
    { question: 'Body percussion uses what instruments?', options: ['Drums and shakers', 'Your own body (stomp, clap, snap, pat)', 'Piano and guitar', 'Only your voice'], correct: 1 },
    { question: 'What is syncopation in music?', options: ['Playing exactly on the beat', 'A rhythm that emphasizes off-beats or unexpected beats', 'Playing very slowly', 'Playing only quarter notes'], correct: 1 },
    { question: 'When composing a 16-measure rhythm piece in 4/4 time, how many total beats should the piece have?', options: ['16 beats', '32 beats', '48 beats', '64 beats'], correct: 3 },
    { question: 'Which world music tradition uses complex cyclical rhythmic patterns called "talas"?', options: ['Brazilian Samba', 'West African Polyrhythm', 'Indian Classical music', 'American Jazz'], correct: 2 }
  ],
  'January': [
    { question: 'How do you calculate your maximum heart rate?', options: ['Count your pulse for one minute', '220 minus your age', '100 plus your age', 'Your weight times 2'], correct: 1 },
    { question: 'In a proper squat, your knees should track over your:', options: ['Heels', 'Toes', 'The sides of your feet', 'Your hips'], correct: 1 },
    { question: 'What is the difference between flexibility and mobility?', options: ['They are the same thing', 'Flexibility is passive stretching; mobility is active control through a range of motion', 'Mobility is only for athletes', 'Flexibility requires weights'], correct: 1 },
    { question: 'Which macronutrient is most important for post-workout muscle recovery?', options: ['Carbohydrates', 'Fats', 'Protein', 'Vitamins'], correct: 2 },
    { question: 'Dynamic stretching is best performed:', options: ['After a workout', 'Before a workout as a warm-up', 'Only by professional athletes', 'While sleeping'], correct: 1 }
  ],
  'February': [
    { question: 'Impressionist painters like Monet used what technique instead of smooth blending?', options: ['Stippling', 'Short, broken brushstrokes placed side by side', 'Airbrushing', 'Finger painting'], correct: 1 },
    { question: 'What is impasto?', options: ['A type of paint', 'Applying paint very thickly so it has physical texture', 'Painting on wet plaster', 'Using only one color'], correct: 1 },
    { question: 'Edgar Degas is famous for painting subjects in:', options: ['Still life', 'Landscapes', 'Motion (especially dancers)', 'Abstract shapes'], correct: 2 },
    { question: '"En plein air" means painting:', options: ['In a studio', 'Outdoors to capture natural light', 'From memory', 'With a palette knife only'], correct: 1 },
    { question: 'Which artist is known for thick, textured paintings like "Starry Night"?', options: ['Claude Monet', 'Edgar Degas', 'Vincent van Gogh', 'Caravaggio'], correct: 2 }
  ],
  'March': [
    { question: 'What is an armature in sculpture?', options: ['The final surface detail', 'An internal supportive skeleton for a sculpture', 'A type of clay', 'The base or pedestal'], correct: 1 },
    { question: 'What is the difference between additive and subtractive clay techniques?', options: ['They are the same', 'Additive adds clay to build up; subtractive carves clay away', 'Subtractive uses more water', 'Additive is only for beginners'], correct: 1 },
    { question: 'A bas-relief sculpture is:', options: ['A freestanding 3D sculpture', 'A sculpture raised from a flat background', 'A drawing on clay', 'A type of painting'], correct: 1 },
    { question: 'In abstract sculpture, "negative space" refers to:', options: ['The area outside the sculpture', 'The empty space or holes within and around the sculpture', 'The color of the sculpture', 'The weight of the materials'], correct: 1 },
    { question: 'Which balance concept is critical for a freestanding sculpture?', options: ['Color balance', 'Center of gravity so it does not fall over', 'Symmetrical patterns only', 'Using the heaviest material'], correct: 1 }
  ],
  'April': [
    { question: 'In serving a tennis ball, what three mechanical phases are important?', options: ['Run, jump, swing', 'Toss, backscratch position, and follow-through', 'Catch, throw, run', 'Bend, stretch, release'], correct: 1 },
    { question: 'In invasion games like soccer, what should a player do immediately after making a pass?', options: ['Stand still and watch', 'Move to open space', 'Run back to defense', 'Ask for the ball back'], correct: 1 },
    { question: 'When designing a sports team logo, how many colors should you limit yourself to for a bold design?', options: ['As many as possible', '1 color only', '2-3 colors', '10 colors'], correct: 2 },
    { question: 'When inventing a new sport, what must the rulebook include?', options: ['Only the scoring system', 'Objective, field layout, equipment, scoring, and fouls', 'Only the team names', 'The history of the sport'], correct: 1 },
    { question: 'What is the "give and go" strategy in team sports?', options: ['Giving the ball to the other team', 'Passing and then immediately moving to open space to receive it back', 'Running in circles', 'Only used in basketball'], correct: 1 }
  ],
  'May': [
    { question: 'In graphic design, visual hierarchy means:', options: ['Using only one font size', 'Making the most important text largest and less important text smaller', 'Random font choices', 'Using only capital letters'], correct: 1 },
    { question: 'The Rule of Thirds in photography involves:', options: ['Dividing the image into thirds vertically only', 'Placing the subject on intersection lines of a 3x3 grid', 'Using exactly three colors', 'Taking exactly three photos'], correct: 1 },
    { question: 'What is the difference between serif and sans-serif fonts?', options: ['Serif has decorative strokes on letter ends; sans-serif does not', 'Sans-serif is only for print', 'Serif is always larger', 'There is no difference'], correct: 0 },
    { question: 'In layout design, "white space" or negative space is used to:', options: ['Fill up the page completely', 'Prevent clutter and let content breathe', 'Make the design look empty', 'Add more text'], correct: 1 },
    { question: 'A digital zine should maintain what across all pages for a professional look?', options: ['The same image on every page', 'A consistent color palette and font scheme', 'Only black and white colors', 'Different layouts on every page'], correct: 1 }
  ],
  'June': [
    { question: 'When matting artwork for display, why is it important that borders are perfectly even?', options: ['It does not matter', 'It elevates the art from a school project to a gallery-quality presentation', 'It saves money on materials', 'It makes the art smaller'], correct: 1 },
    { question: 'An artist statement should include:', options: ['Only the title of the work', 'What the work is, materials used, the theme, and reflections on personal growth', 'A list of your grades', 'Only what you plan to do next year'], correct: 1 },
    { question: 'When curating a gallery exhibition, what should you consider?', options: ['Throwing art on walls randomly', 'The flow, grouping (by medium or chronology), lighting, and narrative', 'Only using the biggest wall', 'Hiding the art'], correct: 1 },
    { question: 'During an art exhibition reception, how should you respond to compliments about your work?', options: ['Say nothing', 'Accept gracefully and explain the techniques you learned', 'Change the subject', 'Say it is not good enough'], correct: 1 },
    { question: 'What creative skills did you develop this year in Art & PE?', options: ['Only drawing', 'Drawing, painting, sculpture, digital design, fitness, and teamwork', 'Only running', 'All of the above!'], correct: 3 }
  ]
}
,

'ages-15-16-math': {
'September': [
{ question: 'What is the result of (-8) x (-4)?', options: ['32', '-32', '12', '-12'], correct: 0 },
{ question: 'When adding integers with different signs, you subtract the absolute values and keep the sign of which number?', options: ['The smaller absolute value', 'The larger absolute value', 'Always positive', 'Always negative'], correct: 1 },
{ question: 'What is the LCD (least common denominator) needed to add 3/4 and 5/6?', options: ['10', '12', '24', '2'], correct: 1 },
{ question: 'Evaluate: | -15 | - | 7 |', options: ['22', '-22', '8', '-8'], correct: 2 },
{ question: 'According to the order of operations (PEMDAS), which operation is performed first in the expression 3 + 4 x 2 - 6 / 3?', options: ['3 + 4', '4 x 2', '2 - 6', '6 / 3'], correct: 1 }
],
'October': [
{ question: 'If a car travels 240 miles in 4 hours, what is the unit rate in miles per hour?', options: ['40 mph', '60 mph', '80 mph', '96 mph'], correct: 1 },
{ question: 'To solve a proportion using cross-multiplication, if a/b = c/d, which equation do you get?', options: ['a + d = b + c', 'a x b = c x d', 'a x d = b x c', 'a - d = b - c'], correct: 2 },
{ question: 'A shirt originally costs $50 and is on sale for 30% off. What is the sale price?', options: ['$15', '$20', '$35', '$45'], correct: 2 },
{ question: 'The ratio 12:16 simplifies to which equivalent ratio?', options: ['2:3', '3:4', '4:5', '6:8'], correct: 1 },
{ question: 'On a map, 1 inch represents 50 miles. Two cities are 3.5 inches apart on the map. What is the actual distance?', options: ['100 miles', '125 miles', '150 miles', '175 miles'], correct: 3 }
],
'November': [
{ question: 'Solve for x: 2x + 5 = 17', options: ['x = 5', 'x = 6', 'x = 7', 'x = 11'], correct: 1 },
{ question: 'What is the first step in solving 3(x + 4) - 2 = 19?', options: ['Subtract 19 from both sides', 'Distribute the 3', 'Add 2 to both sides', 'Divide by 3'], correct: 1 },
{ question: 'When solving an inequality, which operation requires you to flip the inequality symbol?', options: ['Adding a negative number', 'Subtracting a positive number', 'Multiplying by a negative number', 'Dividing by a positive number'], correct: 2 },
{ question: 'Which method is used to solve a system of two linear equations by adding them together to eliminate a variable?', options: ['Substitution', 'Elimination', 'Graphing', 'Factoring'], correct: 1 },
{ question: 'Solve: -3x > 12. Which describes the solution set?', options: ['x > 4', 'x < -4', 'x > -4', 'x < 4'], correct: 1 }
],
'December': [
{ question: 'In which quadrant is the point (-3, 5) located?', options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], correct: 1 },
{ question: 'In the equation y = 3x + 2, what does the number 3 represent?', options: ['The y-intercept', 'The slope', 'The x-intercept', 'The domain'], correct: 1 },
{ question: 'What is the distance between points (1, 2) and (4, 6)?', options: ['3', '4', '5', '7'], correct: 2 },
{ question: 'A quadratic function has a graph that forms what shape?', options: ['A straight line', 'A circle', 'A parabola', 'A V-shape'], correct: 2 },
{ question: 'Using the midpoint formula, what is the midpoint of the segment connecting (2, 4) and (6, 10)?', options: ['(4, 7)', '(8, 14)', '(3, 5)', '(4, 14)'], correct: 0 }
],
'January': [
{ question: 'What is the area of a triangle with base 10 cm and height 6 cm?', options: ['60 sq cm', '30 sq cm', '16 sq cm', '36 sq cm'], correct: 1 },
{ question: 'The surface area formula for a rectangular prism is SA = 2lw + 2lh + 2wh. How many faces does it have?', options: ['4', '6', '8', '12'], correct: 1 },
{ question: 'What is the volume of a cylinder with radius 3 and height 10? (Use pi approximately as 3.14)', options: ['94.2', '282.6', '30', '188.4'], correct: 1 },
{ question: 'In a right triangle with legs of 5 and 12, what is the length of the hypotenuse?', options: ['13', '17', '11', '15'], correct: 0 },
{ question: 'The circumference of a circle with radius 7 cm is closest to which value?', options: ['21.98 cm', '43.96 cm', '153.86 cm', '14 cm'], correct: 1 }
],
'February': [
{ question: 'Two angles are supplementary. If one measures 65 degrees, what is the measure of the other?', options: ['25 degrees', '115 degrees', '65 degrees', '155 degrees'], correct: 1 },
{ question: 'The three interior angles of any triangle always add up to what measure?', options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'], correct: 1 },
{ question: 'When parallel lines are cut by a transversal, which pair of angles are always equal?', options: ['Same-side interior angles', 'Corresponding angles', 'Supplementary angles', 'Adjacent angles'], correct: 1 },
{ question: 'Which transformation changes only the position of a figure while keeping its size and shape the same?', options: ['Dilation', 'Translation', 'Reflection with size change', 'Stretch'], correct: 1 },
{ question: 'A 3-4-5 triangle and a 6-8-10 triangle are an example of which geometric relationship?', options: ['Congruent triangles', 'Similar triangles', 'Complementary angles', 'Vertical angles'], correct: 1 }
],
'March': [
{ question: 'For the data set {3, 7, 7, 8, 12}, what is the mode?', options: ['3', '7', '8', '12'], correct: 1 },
{ question: 'What does the range of a data set measure?', options: ['The most frequent value', 'The average value', 'The difference between the maximum and minimum', 'The middle value'], correct: 2 },
{ question: 'A box plot displays which five-number summary of a data set?', options: ['Mean, median, mode, range, MAD', 'Min, Q1, median, Q3, max', 'Mean, SD, variance, skew, kurtosis', 'Total, average, count, sum, product'], correct: 1 },
{ question: 'What is the probability of rolling a 3 on a fair six-sided die?', options: ['1/3', '1/6', '3/6', '1/2'], correct: 1 },
{ question: 'If you flip a coin and roll a die, how many total outcomes are possible?', options: ['6', '8', '12', '36'], correct: 2 }
],
'April': [
{ question: 'Using FOIL, what is the product of (x + 3)(x - 5)?', options: ['x^2 - 2x - 15', 'x^2 + 2x - 15', 'x^2 - 15', 'x^2 - 8x + 15'], correct: 0 },
{ question: 'Factor completely: 6x^2 + 9x', options: ['3x(2x + 3)', '6x(x + 3)', '3(2x^2 + 3x)', 'x(6x + 9)'], correct: 0 },
{ question: 'What is the factored form of x^2 - 25?', options: ['(x - 5)^2', '(x + 5)^2', '(x - 5)(x + 5)', '(x - 25)(x + 1)'], correct: 2 },
{ question: 'When adding polynomials, what must be true about the terms you combine?', options: ['They must have the same coefficient', 'They must have the same variable and exponent', 'They must be in descending order', 'They must both be positive'], correct: 1 },
{ question: 'A literal equation is best described as which of the following?', options: ['An equation with no solution', 'An equation solved for one variable in terms of others', 'An equation with only numbers', 'An equation that is always true'], correct: 1 }
],
'May': [
{ question: 'In math word problems, the word "of" usually signals which operation?', options: ['Addition', 'Subtraction', 'Multiplication', 'Division'], correct: 2 },
{ question: 'When solving multi-step GED word problems, which step should come first?', options: ['Solve the equation', 'Write the final answer', 'Identify what the question is asking', 'Check with a calculator'], correct: 2 },
{ question: 'The phrase "three less than twice a number" translates to which expression?', options: ['3 - 2x', '2x - 3', '2(x - 3)', '3x - 2'], correct: 1 },
{ question: 'On the GED Math test, which calculator model is permitted?', options: ['TI-84', 'TI-30XS', 'Casio fx-9750', 'HP Prime'], correct: 1 },
{ question: 'A shirt costs $25 after a 20% discount. What was the original price?', options: ['$30.00', '$31.25', '$32.50', '$28.00'], correct: 1 }
],
'June': [
{ question: 'The GED Mathematical Reasoning test is how many minutes long?', options: ['90 minutes', '115 minutes', '120 minutes', '150 minutes'], correct: 1 },
{ question: 'What is the passing scaled score on the GED Math test?', options: ['120', '130', '145', '150'], correct: 2 },
{ question: 'After taking a practice test, which study strategy is most effective for improving your score?', options: ['Retake the same test immediately', 'Focus only on topics you already know', 'Categorize missed problems by content domain and error type', 'Skip the sections you find hardest'], correct: 2 },
{ question: 'The GED Math test has two sections. What distinguishes them?', options: ['One is multiple choice and one is essay', 'One allows a calculator and one does not', 'One is timed and one is untimed', 'One covers algebra and one covers geometry'], correct: 1 },
{ question: 'Looking back at your GED Math journey this year, which topics did you master?', options: ['Number sense and operations', 'Algebra and functions', 'Geometry and statistics', 'All of the above!'], correct: 3 }
]
},
'ages-15-16-english': {
'September': [
{ question: 'What is the difference between the topic of a passage and its main idea?', options: ['They are the same thing', 'The topic is the subject; the main idea is what the author says about it', 'The main idea is always the first sentence', 'The topic is always longer than the main idea'], correct: 1 },
{ question: 'Which of the following best describes a textual inference?', options: ['A fact directly stated in the passage', 'A guess with no evidence', 'A logical conclusion drawn from text evidence plus background knowledge', 'The author\'s opinion'], correct: 2 },
{ question: 'Using context clues, if a sentence reads "The arid desert received no rain for six months," what does "arid" most likely mean?', options: ['Cold', 'Dry', 'Sandy', 'Vast'], correct: 1 },
{ question: 'Which text structure presents events in the order they occurred?', options: ['Cause and effect', 'Compare and contrast', 'Chronological order', 'Problem and solution'], correct: 2 },
{ question: 'When a main idea is implied rather than stated, the reader must do what?', options: ['Skip that paragraph', 'Infer it from supporting details', 'Assume it matches the title', 'Ask the author'], correct: 1 }
],
'October': [
{ question: 'In an argumentative text, what is a "claim"?', options: ['A statistic used as evidence', 'A debatable statement the author argues is true', 'A counterargument to the thesis', 'A summary of the passage'], correct: 1 },
{ question: 'An author writes an article to convince readers to adopt a pet from a shelter. What is the author\'s primary purpose?', options: ['To inform about pet biology', 'To persuade the audience', 'To entertain with a story', 'To describe a process'], correct: 1 },
{ question: 'Which type of evidence would be considered strongest in supporting a claim?', options: ['Personal anecdotes', 'Verified statistics from a credible source', 'Emotional language', 'Vague generalizations'], correct: 1 },
{ question: 'What does "tone" refer to in a piece of writing?', options: ['The author\'s attitude toward the subject', 'The speed of reading', 'The number of paragraphs', 'The vocabulary level'], correct: 0 },
{ question: 'A first-person point of view uses which pronouns to tell the story?', options: ['He, she, they', 'You, your', 'I, me, my', 'It, they, them'], correct: 2 }
],
'November': [
{ question: 'Which sentence has correct subject-verb agreement?', options: ['The group of students are studying.', 'Everyone have their books.', 'The box of chocolates is on the table.', 'Neither of the boys are here.'], correct: 2 },
{ question: 'What is a pronoun-antecedent agreement error?', options: ['Using a verb in the wrong tense', 'When a pronoun does not match the noun it refers to in number or gender', 'Using too many adjectives', 'Starting a sentence with "because"'], correct: 1 },
{ question: 'In the sentence "Running quickly, the finish line seemed closer," what is the modifier error called?', options: ['Subject-verb disagreement', 'Dangling modifier', 'Comma splice', 'Pronoun ambiguity'], correct: 1 },
{ question: 'When should you use a semicolon?', options: ['To introduce a list', 'To connect two closely related independent clauses without a conjunction', 'Before the word "and" in every sentence', 'To replace a period at the end of a paragraph'], correct: 1 },
{ question: 'Which indefinite pronoun is always singular?', options: ['Both', 'Several', 'Each', 'Many'], correct: 2 }
],
'December': [
{ question: 'What does the acronym TAPS stand for when analyzing a GED Extended Response prompt?', options: ['Thesis, Analysis, Proof, Summary', 'Task, Audience, Purpose, Scoring', 'Title, Argument, Position, Sources', 'Topic, Angle, Point, Support'], correct: 1 },
{ question: 'How many minutes are allotted for the GED Extended Response essay?', options: ['25 minutes', '30 minutes', '45 minutes', '60 minutes'], correct: 2 },
{ question: 'The GED Extended Response essay is scored on how many traits?', options: ['2', '3', '4', '5'], correct: 1 },
{ question: 'When writing the Extended Response, what should you do first after reading the prompt and passages?', options: ['Start writing immediately', 'Plan your essay structure and identify evidence', 'Choose font and formatting', 'Write the conclusion'], correct: 1 },
{ question: 'The GED RLA Extended Response requires you to read two passages that typically present what?', options: ['A poem and a story', 'Opposing arguments on an issue', 'Two identical viewpoints', 'Fiction and nonfiction on unrelated topics'], correct: 1 }
],
'January': [
{ question: 'The STEAL method for character analysis stands for Speech, Thoughts, Effect on others, Actions, and what?', options: ['Emotions', 'Looks', 'Language', 'Ethics'], correct: 1 },
{ question: 'A "dynamic character" is one who does what during a story?', options: ['Stays the same throughout', 'Changes or develops in a significant way', 'Is always the antagonist', 'Only appears in one scene'], correct: 1 },
{ question: 'Which of the following is an example of a simile?', options: ['The sun was an orange ball.', 'Her eyes sparkled like diamonds.', 'The wind howled in anger.', 'Time is money.'], correct: 1 },
{ question: 'In literary fiction, what is "conflict"?', options: ['The setting of the story', 'The struggle between opposing forces that drives the plot', 'The author\'s biography', 'The number of characters'], correct: 1 },
{ question: 'What is the "theme" of a literary work?', options: ['The main character\'s name', 'The central message or universal truth the author conveys', 'The time period when it was written', 'The number of pages'], correct: 1 }
],
'February': [
{ question: 'When reading an informational passage with a graph, what should you do first?', options: ['Skip the graph entirely', 'Read the text first for the main idea, then examine the visual data', 'Only look at the graph', 'Memorize the numbers'], correct: 1 },
{ question: 'A workplace document such as an employee handbook is an example of what type of text?', options: ['Literary fiction', 'Functional or informational text', 'Poetry', 'Drama'], correct: 1 },
{ question: 'What does it mean to "synthesize" information from text and data?', options: ['Ignore one source completely', 'Combine insights from both written text and visual data to form understanding', 'Memorize every detail', 'Choose whichever source is shorter'], correct: 1 },
{ question: 'Which graphical display is best for showing change over time?', options: ['Pie chart', 'Line graph', 'Bar graph showing categories', 'Venn diagram'], correct: 1 },
{ question: 'When summarizing nonfiction, which of these should you include?', options: ['Every detail from the passage', 'The main idea and key supporting points in your own words', 'Your personal opinions only', 'Only the title and author'], correct: 1 }
],
'March': [
{ question: 'Which technique combines sentences using words like "because," "although," or "since"?', options: ['Appositives', 'Subordinating conjunctions', 'Relative clauses', 'Parallel structure'], correct: 1 },
{ question: 'What is parallel structure?', options: ['Using short and long sentences alternately', 'Using the same grammatical pattern for items in a list or comparison', 'Writing paragraphs of equal length', 'Repeating the same word twice'], correct: 1 },
{ question: 'Which revision fixes wordiness: "Due to the fact that it was raining, we went inside"?', options: ['Because it was raining, we went inside.', 'It was raining, so therefore we went inside.', 'On account of the rain, we proceeded to go inside.', 'The reason we went inside is because it was raining.'], correct: 0 },
{ question: 'An appositive is a noun phrase that does what?', options: ['Shows possession', 'Renames or identifies another noun right beside it', 'Connects two independent clauses', 'Creates a question'], correct: 1 },
{ question: 'Which sentence uses a relative clause correctly?', options: ['The student studies hard will pass.', 'The student who studies hard will pass.', 'The student, studies hard, will pass.', 'Who studies hard the student will pass.'], correct: 1 }
],
'April': [
{ question: 'Who was the primary author of the Declaration of Independence?', options: ['Benjamin Franklin', 'John Adams', 'Thomas Jefferson', 'George Washington'], correct: 2 },
{ question: 'The phrase "We hold these truths to be self-evident, that all men are created equal" reflects ideas from which philosophical movement?', options: ['Romanticism', 'The Enlightenment', 'Existentialism', 'Modernism'], correct: 1 },
{ question: 'The Gettysburg Address begins "Four score and seven years ago." How many years is a score?', options: ['10', '15', '20', '50'], correct: 2 },
{ question: 'How many grievances against King George III are listed in the Declaration of Independence?', options: ['10', '18', '27', '50'], correct: 2 },
{ question: 'Which foundational document begins with the words "We the People"?', options: ['The Declaration of Independence', 'The Bill of Rights', 'The Gettysburg Address', 'The U.S. Constitution'], correct: 3 }
],
'May': [
{ question: 'How many minutes long is the GED RLA test, including the break?', options: ['90 minutes', '120 minutes', '150 minutes', '180 minutes'], correct: 2 },
{ question: 'When taking the GED RLA test, which strategy helps manage time most effectively?', options: ['Spend equal time on every question', 'Use the two-pass system: answer easy questions first, then return to hard ones', 'Start with the Extended Response', 'Read every passage twice before answering'], correct: 1 },
{ question: 'For the Extended Response, how many minutes should you budget for planning?', options: ['1 minute', '5 minutes', '15 minutes', '25 minutes'], correct: 1 },
{ question: 'What percentage of the GED RLA reading passages are nonfiction?', options: ['About 25%', 'About 50%', 'About 75%', 'About 90%'], correct: 2 },
{ question: 'Which question type should you tackle first on a timed reading test?', options: ['The longest passage questions', 'The shortest or most straightforward questions', 'The Extended Response', 'The last questions first'], correct: 1 }
],
'June': [
{ question: 'After scoring a practice test, what should you do with every incorrect answer?', options: ['Ignore them and move on', 'Analyze why you got it wrong and categorize the error type', 'Memorize the correct letter', 'Only review math errors'], correct: 1 },
{ question: 'What are the three traits the GED RLA Extended Response is scored on?', options: ['Grammar, vocabulary, handwriting', 'Arguments/evidence, development/organization, clarity/conventions', 'Length, font, margins', 'Creativity, humor, style'], correct: 1 },
{ question: 'Which study habit is most effective between practice tests?', options: ['Cramming all topics equally', 'Targeted review of your weakest areas identified through error analysis', 'Reading new novels only', 'Avoiding all GED materials'], correct: 1 },
{ question: 'What is the passing scaled score on the GED RLA test?', options: ['130', '140', '145', '150'], correct: 2 },
{ question: 'Reflecting on your RLA journey this year, which skills did you build?', options: ['Reading comprehension and inference', 'Grammar, essay writing, and argument analysis', 'Test-taking strategies and time management', 'All of the above!'], correct: 3 }
]
},
'ages-15-16-science': {
'September': [
{ question: 'The GED Science test covers approximately how many questions in 90 minutes?', options: ['20 questions', '35 questions', '50 questions', '75 questions'], correct: 1 },
{ question: 'In a scientific experiment, what is the independent variable?', options: ['The variable that is measured or observed', 'The variable that the scientist changes on purpose', 'The variable kept the same in all trials', 'The conclusion of the experiment'], correct: 1 },
{ question: 'Which Life Science topic makes up the largest percentage of the GED Science test?', options: ['Earth and Space Science at 50%', 'Life Science at 40%', 'Physical Science at 60%', 'All domains are equal at 33%'], correct: 1 },
{ question: 'When reading a science graph, what does the x-axis typically represent?', options: ['The dependent variable', 'The independent variable', 'The control group', 'The hypothesis'], correct: 1 },
{ question: 'A scatter plot that shows points rising from left to right suggests what kind of relationship?', options: ['No relationship', 'A negative correlation', 'A positive correlation', 'A random distribution'], correct: 2 }
],
'October': [
{ question: 'Which organelle is known as the "powerhouse" of the cell because it produces ATP energy?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], correct: 2 },
{ question: 'In DNA, which base pairs with adenine (A)?', options: ['Guanine (G)', 'Cytosine (C)', 'Thymine (T)', 'Uracil (U)'], correct: 2 },
{ question: 'In a Punnett square cross between Tt and Tt, what percentage of offspring would you expect to show the recessive trait?', options: ['0%', '25%', '50%', '75%'], correct: 1 },
{ question: 'Natural selection, as described by Darwin, requires which of the following conditions?', options: ['Identical offspring', 'No competition', 'Variation, inheritance, and differential survival', 'Sudden mutations only'], correct: 2 },
{ question: 'What is the primary difference between prokaryotic and eukaryotic cells?', options: ['Prokaryotes are larger', 'Prokaryotes lack a nucleus; eukaryotes have a nucleus', 'Eukaryotes cannot make proteins', 'Prokaryotes have more organelles'], correct: 1 }
],
'November': [
{ question: 'In a food web, approximately what percentage of energy transfers from one trophic level to the next?', options: ['50%', '25%', '10%', '1%'], correct: 2 },
{ question: 'Which organism role in an ecosystem breaks down dead matter and returns nutrients to the soil?', options: ['Producer', 'Primary consumer', 'Decomposer', 'Tertiary consumer'], correct: 2 },
{ question: 'Which biome is characterized by the highest biodiversity and consistent warm, wet conditions?', options: ['Tundra', 'Desert', 'Tropical rainforest', 'Taiga'], correct: 2 },
{ question: 'Homeostasis refers to what process in the human body?', options: ['Cell division', 'The body maintaining a stable internal environment', 'DNA replication', 'Breaking down food'], correct: 1 },
{ question: 'If producers contain 10,000 kcal of energy, how much energy reaches the tertiary consumer level?', options: ['1,000 kcal', '100 kcal', '10 kcal', '1 kcal'], correct: 2 }
],
'December': [
{ question: 'Which phase transition occurs when a solid turns directly into a gas without becoming a liquid?', options: ['Evaporation', 'Condensation', 'Sublimation', 'Deposition'], correct: 2 },
{ question: 'On the periodic table, what does the atomic number of an element represent?', options: ['Its mass', 'Its number of protons', 'Its number of neutrons', 'Its number of electron shells'], correct: 1 },
{ question: 'Which of the following is a chemical change, not a physical change?', options: ['Melting ice', 'Crushing a can', 'Rusting iron', 'Tearing paper'], correct: 2 },
{ question: 'On the pH scale, a substance with a pH of 3 is classified as what?', options: ['Neutral', 'A base', 'An acid', 'A salt'], correct: 2 },
{ question: 'Which state of matter has molecules that move freely with no fixed shape or volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correct: 2 }
],
'January': [
{ question: 'According to Newton\'s second law, what is the formula for force?', options: ['F = m/a', 'F = ma', 'F = m + a', 'F = m - a'], correct: 1 },
{ question: 'A 5 kg object accelerates at 3 m/s^2. What is the force applied?', options: ['8 N', '2 N', '15 N', '1.67 N'], correct: 2 },
{ question: 'What type of energy does a book sitting on a high shelf have?', options: ['Kinetic energy', 'Gravitational potential energy', 'Thermal energy', 'Nuclear energy'], correct: 1 },
{ question: 'Which of Newton\'s laws explains why you feel pushed back in your seat when a car accelerates?', options: ['First law (inertia)', 'Second law (F=ma)', 'Third law (action-reaction)', 'Law of gravity'], correct: 0 },
{ question: 'Sound waves and light waves both transfer energy, but sound waves require what that light waves do not?', options: ['A vacuum', 'A medium (such as air, water, or solids)', 'A high temperature', 'Gravity'], correct: 1 }
],
'February': [
{ question: 'Which rock type forms from cooling magma or lava?', options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Volcanic glass only'], correct: 2 },
{ question: 'At which type of plate boundary do earthquakes and volcanoes most commonly occur?', options: ['Divergent boundaries only', 'Convergent and transform boundaries', 'Only mid-ocean ridges', 'Plate boundaries never cause earthquakes'], correct: 1 },
{ question: 'Marble is formed when limestone is subjected to extreme heat and pressure. What type of rock is marble?', options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Mineral'], correct: 2 },
{ question: 'Which layer of Earth is the thinnest and where we live?', options: ['Mantle', 'Outer core', 'Crust', 'Inner core'], correct: 2 },
{ question: 'The supercontinent that existed millions of years ago before plates drifted apart is called what?', options: ['Laurasia', 'Pangaea', 'Gondwana', 'Atlantis'], correct: 1 }
],
'March': [
{ question: 'In which atmospheric layer does most weather occur?', options: ['Stratosphere', 'Mesosphere', 'Troposphere', 'Thermosphere'], correct: 2 },
{ question: 'What is the main difference between weather and climate?', options: ['Weather is hot; climate is cold', 'Weather is short-term conditions; climate is long-term patterns', 'Weather only involves rain; climate only involves temperature', 'There is no difference'], correct: 1 },
{ question: 'The ozone layer, which protects life from harmful UV radiation, is located in which atmospheric layer?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Exosphere'], correct: 1 },
{ question: 'Approximately what percentage of Earth\'s atmosphere is nitrogen?', options: ['21%', '50%', '78%', '1%'], correct: 2 },
{ question: 'In the water cycle, what is the process called when water vapor cools and turns back into liquid water?', options: ['Evaporation', 'Condensation', 'Sublimation', 'Transpiration'], correct: 1 }
],
'April': [
{ question: 'What are the four parts of a GED science passage you should identify when reading?', options: ['Title, author, date, publisher', 'Hypothesis, experiment, results, conclusion', 'Question, answer, summary, opinion', 'Introduction, body, transition, conclusion'], correct: 1 },
{ question: 'When comparing two experiments on the same topic, what should you look for first?', options: ['Which one is longer', 'Differences in variables, methods, and sample size', 'Which author is more famous', 'Which has more graphs'], correct: 1 },
{ question: 'In a science passage, what is a "hypothesis"?', options: ['A proven fact', 'A testable prediction being investigated', 'The final conclusion', 'An unrelated observation'], correct: 1 },
{ question: 'What strategy does the curriculum recommend for reading GED science passages efficiently?', options: ['Read every word twice', 'Read the questions first, then skim the passage with purpose', 'Skip the passage and guess', 'Only read the conclusion'], correct: 1 },
{ question: 'When evaluating scientific evidence, which question is most important to ask?', options: ['Is the passage short?', 'Is the evidence sufficient, relevant, and from a credible source?', 'Does it match my personal opinion?', 'Is it interesting?'], correct: 1 }
],
'May': [
{ question: 'How many minutes are allotted for the GED Science test?', options: ['60 minutes', '90 minutes', '115 minutes', '150 minutes'], correct: 1 },
{ question: 'Approximately how much time should you spend per question on the GED Science test?', options: ['30 seconds', '1 minute', '2.5 minutes', '5 minutes'], correct: 2 },
{ question: 'Which question type should you answer first to bank time on the GED Science test?', options: ['The longest passage questions', 'Standalone or short questions', 'The essay portion', 'The hardest questions'], correct: 1 },
{ question: 'What is the "read-questions-first" strategy designed to do?', options: ['Make the test harder', 'Help you read with purpose and locate relevant information faster', 'Eliminate the need to read passages', 'Help you guess better'], correct: 1 },
{ question: 'On the GED Science test, is a calculator allowed?', options: ['No, never', 'Yes, on all questions', 'Yes, for the calculator-permitted section only', 'Only for math questions'], correct: 2 }
],
'June': [
{ question: 'After completing a full GED Science practice test, what should you do first?', options: ['Throw it away', 'Score all questions and categorize each by content domain', 'Only check the answers you were unsure about', 'Start a new test immediately'], correct: 1 },
{ question: 'Which of the three GED Science content domains is worth approximately 40% of the test?', options: ['Only Life Science', 'Only Physical Science', 'Both Life Science and Physical Science', 'Earth and Space Science'], correct: 2 },
{ question: 'When categorizing errors in your error log, which categories should you track?', options: ['Correct and incorrect only', 'Content area, question type, and error type (content gap, misread, etc.)', 'Only the question number', 'Time spent per question only'], correct: 1 },
{ question: 'What is the passing score on the GED Science test?', options: ['130', '140', '145', '150'], correct: 2 },
{ question: 'Thinking about your GED Science prep this year, what did you learn about?', options: ['Life science, physical science, and earth science', 'Scientific reasoning and data analysis', 'Test strategies and time management', 'All of the above!'], correct: 3 }
]
},
'ages-15-16-social-studies': {
'September': [
{ question: 'What was the Great Compromise at the 1787 Constitutional Convention?', options: ['It ended slavery immediately', 'It created a bicameral legislature with representation by population and equal representation', 'It gave the president unlimited power', 'It eliminated the judicial branch'], correct: 1 },
{ question: 'Which phrase opens the Preamble to the U.S. Constitution?', options: ['When in the course of human events', 'We the People', 'Four score and seven years ago', 'Congress shall make no law'], correct: 1 },
{ question: 'How many amendments make up the Bill of Rights?', options: ['5', '7', '10', '27'], correct: 2 },
{ question: 'Article I of the Constitution establishes which branch of government?', options: ['Executive', 'Judicial', 'Legislative', 'Military'], correct: 2 },
{ question: 'The Federalists and Anti-Federalists disagreed primarily over which issue?', options: ['Whether to have a president', 'Whether to ratify the Constitution with or without a Bill of Rights', 'Whether to remain a British colony', 'Whether to have elections'], correct: 1 }
],
'October': [
{ question: 'How many steps does a bill typically go through to become a law?', options: ['3', '5', '7', '9'], correct: 3 },
{ question: 'Which constitutional power allows the president to reject a bill passed by Congress?', options: ['Executive order', 'The veto', 'Judicial review', 'Filibuster'], correct: 1 },
{ question: 'The system of checks and balances was designed to do what?', options: ['Make laws pass faster', 'Prevent any one branch from gaining too much power', 'Eliminate the judicial branch', 'Give the president final authority on all matters'], correct: 1 },
{ question: 'How many members are in the U.S. Senate?', options: ['50', '100', '435', '270'], correct: 1 },
{ question: 'Judicial review, the power of courts to declare laws unconstitutional, was established by which Supreme Court case?', options: ['Plessy v. Ferguson', 'Brown v. Board of Education', 'Marbury v. Madison', 'Roe v. Wade'], correct: 2 }
],
'November': [
{ question: 'The 13th, 14th, and 15th Amendments are collectively known as what?', options: ['The Bill of Rights', 'The Reconstruction Amendments', 'The Progressive Amendments', 'The Civil War Amendments'], correct: 1 },
{ question: 'What brought the Reconstruction era to an end?', options: ['The Civil War', 'The Compromise of 1877', 'The Emancipation Proclamation', 'The New Deal'], correct: 1 },
{ question: 'Which term describes the rapid industrialization, immigration, and urbanization of America from 1870 to 1900?', options: ['The Progressive Era', 'The Gilded Age', 'The Roaring Twenties', 'The New Deal'], correct: 1 },
{ question: 'Which Progressive Era reform gave voters the power to propose laws directly?', options: ['The initiative', 'The spoil system', 'The gold standard', 'Laissez-faire'], correct: 0 },
{ question: 'What event in 1914 triggered the start of World War I?', options: ['The bombing of Pearl Harbor', 'The assassination of Archduke Franz Ferdinand', 'The sinking of the Lusitania', 'The invasion of Poland'], correct: 1 }
],
'December': [
{ question: 'Which event caused the United States to enter World War II?', options: ['The invasion of Poland', 'The bombing of Pearl Harbor', 'D-Day', 'The fall of Berlin'], correct: 1 },
{ question: 'What was the "Iron Curtain" that Winston Churchill described?', options: ['A physical wall across Europe', 'The ideological divide between Western democracies and Soviet-controlled Eastern Europe', 'A military defense line in Germany', 'A type of censorship in the US'], correct: 1 },
{ question: 'Which two nations were the primary rivals during the Cold War?', options: ['Germany and Japan', 'China and Russia', 'The United States and the Soviet Union', 'Britain and France'], correct: 2 },
{ question: 'The United Nations was founded after which conflict?', options: ['World War I', 'The Korean War', 'World War II', 'The Vietnam War'], correct: 2 },
{ question: 'Which geographic skill involves identifying the absolute location of a place using coordinates?', options: ['Map projection', 'Using latitude and longitude', 'Thematic mapping', 'Mental mapping'], correct: 1 }
],
'January': [
{ question: 'In economics, what happens when demand exceeds supply?', options: ['Prices decrease', 'Prices increase', 'Prices stay the same', 'The market closes'], correct: 1 },
{ question: 'The United States is best described as which type of economy?', options: ['Command economy', 'Pure market economy', 'Mixed economy', 'Traditional economy'], correct: 2 },
{ question: 'What does GDP stand for?', options: ['General Domestic Production', 'Gross Domestic Product', 'Government Debt Percentage', 'Global Development Plan'], correct: 1 },
{ question: 'If a drought destroys much of the corn crop, which curve shifts on the supply-demand graph?', options: ['The demand curve shifts right', 'The supply curve shifts left', 'The demand curve shifts left', 'The supply curve shifts right'], correct: 1 },
{ question: 'Which personal finance concept means spreading your investments to reduce risk?', options: ['Budgeting', 'Diversification', 'Inflation', 'Credit score'], correct: 1 }
],
'February': [
{ question: 'How many electoral votes are needed to win the U.S. presidency?', options: ['100', '218', '270', '538'], correct: 2 },
{ question: 'What is the difference between a primary election and a general election?', options: ['There is no difference', 'Primaries select party nominees; general elections choose the winner', 'Primaries are for local offices only; general elections are federal only', 'General elections happen in January'], correct: 1 },
{ question: 'Which amendment guaranteed women the right to vote?', options: ['15th Amendment', '19th Amendment', '26th Amendment', '14th Amendment'], correct: 1 },
{ question: 'In the 2000 election (Bush v. Gore), what role did the Electoral College play?', options: ['The winner also won the popular vote', 'The Electoral College result matched the popular vote in every state', 'The winner of the Electoral College lost the national popular vote', 'The Electoral College was abolished'], correct: 2 },
{ question: 'Which civic responsibility is considered a duty (required by law) rather than a voluntary action?', options: ['Voting in elections', 'Serving on a jury when called', 'Volunteering in the community', 'Attending town hall meetings'], correct: 1 }
],
'March': [
{ question: 'Which 1954 Supreme Court case ruled that racial segregation in public schools was unconstitutional?', options: ['Plessy v. Ferguson', 'Brown v. Board of Education', 'Marbury v. Madison', 'Dred Scott v. Sandford'], correct: 1 },
{ question: 'What strategy did Martin Luther King Jr. primarily advocate during the Civil Rights Movement?', options: ['Armed resistance', 'Nonviolent resistance and civil disobedience', 'Litigation only', 'Separatism'], correct: 1 },
{ question: 'The Gulf of Tonkin Resolution led to increased U.S. involvement in which conflict?', options: ['World War II', 'The Korean War', 'The Vietnam War', 'The Gulf War'], correct: 2 },
{ question: 'What was the Watergate scandal?', options: ['A foreign policy agreement', 'A break-in at Democratic headquarters and subsequent cover-up that led to Nixon\'s resignation', 'A Supreme Court case about voting rights', 'An economic crisis'], correct: 1 },
{ question: 'Which Civil Rights Act, signed in 1964, outlawed discrimination based on race, color, religion, sex, or national origin?', options: ['The Civil Rights Act of 1957', 'The Civil Rights Act of 1964', 'The Voting Rights Act of 1965', 'The Fair Housing Act of 1968'], correct: 1 }
],
'April': [
{ question: 'Which of the five themes of geography answers the question "Where is it?"', options: ['Place', 'Location', 'Region', 'Movement'], correct: 1 },
{ question: 'The five themes of geography are Location, Place, Region, Movement, and what?', options: ['Climate', 'Human-Environment Interaction', 'Population', 'Culture'], correct: 1 },
{ question: 'Why do most major cities tend to develop near bodies of water?', options: ['For scenic views only', 'Access to trade routes, drinking water, and fertile land', 'Governments require it', 'Cities are always coastal'], correct: 1 },
{ question: 'Which type of migration pattern describes people moving from rural areas to cities?', options: ['Emigration', 'Immigration', 'Urbanization', 'Nomadism'], correct: 2 },
{ question: 'Economic geography primarily studies what relationship?', options: ['How climate affects weather', 'How economic activities are distributed across geographic space', 'How mountains form', 'How ocean currents move'], correct: 1 }
],
'May': [
{ question: 'The GED Social Studies Extended Response gives you approximately how many minutes to write?', options: ['10 minutes', '15 minutes', '25 minutes', '45 minutes'], correct: 2 },
{ question: 'When annotating source documents, what color highlighting does the curriculum recommend for claims?', options: ['Green', 'Yellow', 'Pink', 'Blue'], correct: 1 },
{ question: 'What should you do first when approaching a GED Social Studies Extended Response prompt?', options: ['Start writing immediately', 'Analyze the prompt to identify what you are being asked to do', 'Count the words in each source', 'Choose your font'], correct: 1 },
{ question: 'Which of these is NOT one of the three traits the GED Extended Response is scored on?', options: ['Analysis of arguments and use of evidence', 'Development of ideas and organization', 'Number of sources cited', 'Clarity and command of standard English'], correct: 2 },
{ question: 'What percentage of the GED Social Studies test covers civics and government?', options: ['About 20%', 'About 30%', 'About 50%', 'About 75%'], correct: 2 }
],
'June': [
{ question: 'The GED Social Studies test is how many minutes long?', options: ['60 minutes', '70 minutes', '90 minutes', '120 minutes'], correct: 2 },
{ question: 'When creating an error log after a practice test, which categories should you track for each missed question?', options: ['Only the correct answer', 'Content area, question type, and root cause of the error', 'Only how long it took', 'Only whether you guessed'], correct: 1 },
{ question: 'What is the passing score on the GED Social Studies test?', options: ['130', '140', '145', '155'], correct: 2 },
{ question: 'Which test-taking strategy does the curriculum recommend for questions you are unsure about?', options: ['Leave them blank', 'Flag them and return after answering questions you know', 'Always pick C', 'Spend 5 minutes on each one'], correct: 1 },
{ question: 'Reflecting on everything you studied this year for GED Social Studies, what topics did you cover?', options: ['Civics, U.S. history, and economics', 'World history, geography, and government', 'Constitutional law and civil rights', 'All of the above!'], correct: 3 }
]
}
,

'ages-17-18-math': {
  'September': [
    { question: 'When solving the equation 3(x + 2) = 3x + 5, what type of solution set does this equation have?', options: ['Exactly one solution', 'No solution', 'Infinitely many solutions', 'Two distinct solutions'], correct: 1 },
    { question: 'A line passes through the points (1, 3) and (4, 9). What is the equation of this line in slope-intercept form?', options: ['y = 3x', 'y = 2x + 1', 'y = 3x - 1', 'y = 2x + 3'], correct: 1 },
    { question: 'A system of two linear equations has graphs that are parallel but distinct lines. How many solutions does the system have?', options: ['Zero', 'One', 'Two', 'Infinitely many'], correct: 0 },
    { question: 'Which of the following is equivalent to the standard form equation 2x + 3y = 12 when converted to slope-intercept form?', options: ['y = -2/3 x + 4', 'y = 2/3 x + 4', 'y = -3/2 x + 6', 'y = 3/2 x + 6'], correct: 0 },
    { question: 'A phone plan costs $25 per month plus $0.10 per text. If the monthly bill is $40, which equation correctly models this situation?', options: ['25 + 0.10t = 40', '0.10 + 25t = 40', '25(0.10 + t) = 40', '0.10t - 25 = 40'], correct: 0 }
  ],
  'October': [
    { question: 'A recipe requires 3 eggs for 8 servings. How many eggs are needed for 20 servings?', options: ['5', '6', '7.5', '8'], correct: 2 },
    { question: 'A jacket originally priced at $80 is on sale for 20% off. A customer then uses a 10% off coupon on the sale price. What is the final price?', options: ['$52.00', '$57.60', '$56.00', '$60.00'], correct: 1 },
    { question: 'A data set has a mean of 50 and a standard deviation of 5. Using the empirical rule, approximately what percentage of data falls between 45 and 55?', options: ['34%', '68%', '95%', '99.7%'], correct: 1 },
    { question: 'In a group of 120 students, 70 take math, 50 take English, and 30 take both. What is the probability that a randomly selected student takes neither subject?', options: ['1/4', '1/3', '1/6', '1/2'], correct: 0 },
    { question: 'A scatter plot shows a strong negative linear relationship. Which value is the most likely correlation coefficient?', options: ['0.85', '-0.12', '-0.91', '0.03'], correct: 2 }
  ],
  'November': [
    { question: 'Which of the following is the correct factorization of x\u00B2 - 9?', options: ['(x - 3)\u00B2', '(x + 3)(x - 3)', '(x - 9)(x + 1)', '(x + 9)(x - 1)'], correct: 1 },
    { question: 'For the quadratic equation 2x\u00B2 + 5x - 3 = 0, what is the value of the discriminant?', options: ['1', '25', '49', '37'], correct: 2 },
    { question: 'A quadratic function has a vertex at (2, -5) and passes through the point (0, 3). Which equation could represent this function?', options: ['y = 2(x - 2)\u00B2 - 5', 'y = (x + 2)\u00B2 - 5', 'y = -2(x - 2)\u00B2 - 5', 'y = 2(x + 2)\u00B2 + 5'], correct: 0 },
    { question: 'When dividing the polynomial x\u00B3 - 6x\u00B2 + 11x - 6 by (x - 1), what is the quotient?', options: ['x\u00B2 - 5x + 6', 'x\u00B2 - 7x + 6', 'x\u00B2 + 5x - 6', 'x\u00B2 - 5x - 6'], correct: 0 },
    { question: 'The graph of a quadratic function opens upward and has x-intercepts at x = -1 and x = 3. Which of the following could be its equation?', options: ['y = -(x + 1)(x - 3)', 'y = (x - 1)(x + 3)', 'y = (x + 1)(x - 3)', 'y = -(x - 1)(x + 3)'], correct: 2 }
  ],
  'December': [
    { question: 'If f(x) = 2x + 3, what is the value of f(4)?', options: ['7', '9', '11', '14'], correct: 2 },
    { question: 'What is the domain of the function f(x) = 1/(x - 5)?', options: ['All real numbers', 'All real numbers except 5', 'All real numbers except 0', 'All positive real numbers'], correct: 1 },
    { question: 'The graph of y = f(x) is shifted 3 units right and 2 units up. Which equation represents this transformation?', options: ['y = f(x - 3) + 2', 'y = f(x + 3) + 2', 'y = f(x - 3) - 2', 'y = f(x + 3) - 2'], correct: 0 },
    { question: 'A population of bacteria doubles every 3 hours. If the initial population is 100, which function models the population after t hours?', options: ['P(t) = 100 \u00B7 3\u02D7', 'P(t) = 100 \u00B7 2^(t/3)', 'P(t) = 100 + 2t', 'P(t) = 100 \u00B7 e^(2t)'], correct: 1 },
    { question: 'If f(x) = x\u00B2 and g(x) = x + 1, what is f(g(3))?', options: ['10', '16', '12', '9'], correct: 1 }
  ],
  'January': [
    { question: 'Two parallel lines are cut by a transversal. If one interior angle measures 72\u00B0, what is the measure of its same-side interior angle?', options: ['72\u00B0', '108\u00B0', '118\u00B0', '88\u00B0'], correct: 1 },
    { question: 'In triangle ABC, angle A = 50\u00B0 and angle B = 70\u00B0. What is the measure of the exterior angle at vertex C?', options: ['50\u00B0', '70\u00B0', '120\u00B0', '60\u00B0'], correct: 2 },
    { question: 'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?', options: ['13', '17', '11', '15'], correct: 0 },
    { question: 'In a right triangle, the side opposite a 30\u00B0 angle has length 7. What is the length of the hypotenuse?', options: ['7\u221A2', '14', '7\u221A3', '3.5'], correct: 1 },
    { question: 'If sin(\u03B8) = 3/5 and \u03B8 is in the first quadrant, what is cos(\u03B8)?', options: ['3/5', '4/5', '5/3', '5/4'], correct: 1 }
  ],
  'February': [
    { question: 'The equation (x - 3)\u00B2 + (y + 2)\u00B2 = 25 represents a circle. What are the center and radius?', options: ['Center (3, -2), radius 5', 'Center (-3, 2), radius 5', 'Center (3, 2), radius 25', 'Center (-3, -2), radius 5'], correct: 0 },
    { question: 'A circle has radius 10. What is the length of the arc intercepted by a central angle of 90\u00B0?', options: ['5\u03C0', '10\u03C0', '2.5\u03C0', '15\u03C0'], correct: 0 },
    { question: 'A cylinder has a radius of 3 and a height of 10. What is its volume?', options: ['30\u03C0', '90\u03C0', '60\u03C0', '45\u03C0'], correct: 1 },
    { question: 'To convert the general form x\u00B2 + y\u00B2 - 6x + 4y - 12 = 0 to standard form, you complete the square. What is the resulting center?', options: ['(3, -2)', '(-3, 2)', '(6, -4)', '(-6, 4)'], correct: 0 },
    { question: 'What is the area of a sector with radius 6 and central angle of 60\u00B0?', options: ['6\u03C0', '12\u03C0', '3\u03C0', '36\u03C0'], correct: 0 }
  ],
  'March': [
    { question: 'When simplifying (x\u00B2 - 9)/(x + 3), what restriction must be placed on x?', options: ['x \u2260 0', 'x \u2260 3', 'x \u2260 -3', 'x \u2260 9'], correct: 2 },
    { question: 'Solving the rational equation 3/x = 6/4 produces which value of x?', options: ['x = 2', 'x = 8', 'x = 0.5', 'x = 4.5'], correct: 0 },
    { question: 'What is the solution to the absolute value equation |2x - 5| = 9?', options: ['x = 7 only', 'x = 7 or x = -2', 'x = 2 or x = -7', 'x = -2 only'], correct: 1 },
    { question: 'Which of the following is a solution to the equation \u221A(2x + 1) = 5?', options: ['x = 2', 'x = 12', 'x = 4', 'x = 24'], correct: 1 },
    { question: 'What is the value of i\u00B3 where i is the imaginary unit?', options: ['1', '-1', 'i', '-i'], correct: 3 }
  ],
  'April': [
    { question: 'The Digital SAT Math section has how many total questions and how many minutes?', options: ['54 questions in 70 minutes', '44 questions in 70 minutes', '44 questions in 60 minutes', '54 questions in 80 minutes'], correct: 1 },
    { question: 'On the Digital SAT, Module 2 difficulty is determined by performance on which section?', options: ['Module 2 of Reading & Writing', 'Module 1 of the same subject', 'The previous test section', 'A random selection'], correct: 1 },
    { question: 'If 3x + 7 = 28, which answer choice can you immediately eliminate without solving: x = 5, x = 6, x = 7, x = 8?', options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'], correct: 2 },
    { question: 'Which content domain makes up approximately 35% of the Digital SAT Math section?', options: ['Problem Solving & Data Analysis', 'Geometry & Trigonometry', 'Algebra', 'Both Algebra and Advanced Math'], correct: 3 },
    { question: 'Which of the following is the most efficient first step when a calculator is available for a multi-step arithmetic SAT question?', options: ['Solve entirely by hand to avoid errors', 'Estimate the answer mentally, then verify with the calculator', 'Type the entire expression at once into the calculator', 'Skip the question and return to it later'], correct: 1 }
  ],
  'May': [
    { question: 'When analyzing SAT practice test errors, which error category describes a mistake caused by reading the question too quickly?', options: ['Concept gap', 'Calculation mistake', 'Misread question', 'Time pressure'], correct: 2 },
    { question: 'A student has 70 minutes for 44 questions. After spending 30 minutes on the first 18 questions, how many seconds per question should they average for the remaining questions?', options: ['71 seconds', '80 seconds', '91 seconds', '60 seconds'], correct: 0 },
    { question: 'On SAT grid-in questions, which of the following answers would NOT be accepted by the answer sheet?', options: ['3/4', '0.75', '1.5', '-2'], correct: 3 },
    { question: 'When facing a level 4-5 difficulty SAT math problem, which strategy is recommended first?', options: ['Immediately use the calculator on every step', 'Read the question twice and identify what it is actually asking', 'Guess randomly and move on to save time', 'Plug in all four answer choices before thinking'], correct: 1 },
    { question: 'A student incorrectly answered 6 algebra questions, 4 data analysis questions, and 2 geometry questions on a practice test. Which content domain should they prioritize for review?', options: ['Geometry', 'Advanced Math', 'Algebra', 'Data Analysis'], correct: 2 }
  ],
  'June': [
    { question: 'During a full SAT practice test simulation, how many math modules and how many total minutes should you complete?', options: ['1 module, 35 minutes', '2 modules, 70 minutes', '3 modules, 90 minutes', '2 modules, 60 minutes'], correct: 1 },
    { question: 'After completing a practice test, reviewing why each incorrect answer is wrong is called what type of analysis?', options: ['Speed analysis', 'Content domain scoring', 'Error log analysis', 'Adaptive testing'], correct: 2 },
    { question: 'Which of the following is recommended test-day advice for the SAT Math section?', options: ['Memorize all formulas since none are provided', 'Use only mental math to save time', 'Skip any question that takes more than 10 seconds to read', 'Bring scratch paper and work through problems systematically'], correct: 3 },
    { question: 'A student scores 520 on a practice SAT Math test. Their goal is 600. Based on the adaptive format, which module strategy is most important?', options: ['Guess faster on Module 2', 'Maximize Module 1 performance to unlock harder Module 2 questions', 'Skip Module 1 to save energy for Module 2', 'Focus only on grid-in questions in both modules'], correct: 1 },
    { question: 'Looking back at the entire SAT Math curriculum this year, which topics did you master?', options: ['Linear equations and algebra', 'Geometry and trigonometry', 'Data analysis and statistics', 'All of the above!'], correct: 3 }
  ]
},
'ages-17-18-english': {
  'September': [
    { question: 'On the Digital SAT, what is the difference between the "topic" and the "central idea" of a passage?', options: ['They are the same thing', 'A topic is a word or phrase; a central idea is a complete sentence summarizing the passage', 'A central idea is always shorter than a topic', 'A topic is the author\'s opinion; a central idea is a fact'], correct: 1 },
    { question: 'An SAT inference question asks "what is most likely true" based on a passage. The best answer will:', options: ['Be directly stated in the passage word-for-word', 'Require no evidence from the text', 'Be supported by textual evidence without being explicitly stated', 'Be the most dramatic or surprising option'], correct: 2 },
    { question: 'On the Digital SAT Reading & Writing section, each question is paired with what?', options: ['A full-length novel excerpt', 'Its own short passage', 'A video clip', 'A vocabulary list'], correct: 1 },
    { question: 'When answering a "cross-text connections" question, you must:', options: ['Choose which passage is better written', 'Compare how two authors approach the same topic or theme', 'Identify which passage was published first', 'Count how many arguments each author makes'], correct: 1 },
    { question: 'Which strategy is recommended for identifying the central idea on the SAT?', options: ['Read only the first sentence of each paragraph', 'Answer the central idea question before reading the passage', 'Read the full passage first, then summarize in your own words', 'Skip central idea questions because they are too time-consuming'], correct: 2 }
  ],
  'October': [
    { question: 'On the SAT, a "words in context" question asks you to choose a word that best fits a blank. Which factor should you prioritize?', options: ['Choosing the word you recognize most easily', 'Picking the longest word available', 'How the word functions in the surrounding sentence context', 'Selecting the word with the most positive connotation'], correct: 2 },
    { question: 'The words "thrifty" and "cheap" are close synonyms, but they differ in which key way?', options: ['Part of speech', 'Connotation', 'Syllable count', 'Register only'], correct: 1 },
    { question: 'An SAT passage describes a scientific discovery in cautious, measured language. The author\'s tone is best described as:', options: ['Enthusiastic', 'Sarcastic', 'Objective', 'Melodramatic'], correct: 2 },
    { question: 'Which of the following best describes why an author might use a compare-and-contrast text structure?', options: ['To confuse the reader with opposing viewpoints', 'To highlight similarities and differences between two subjects', 'To present events in chronological order', 'To describe a single topic in extreme detail'], correct: 1 },
    { question: 'When analyzing an author\'s purpose on the SAT, which question is most useful to ask yourself?', options: ['"What is the author\'s name?"', '"What is the author trying to accomplish with this passage?"', '"How many paragraphs does this passage have?"', '"What is my personal opinion on this topic?"'], correct: 1 }
  ],
  'November': [
    { question: 'In the sentence "The group of students (is/are) studying," which verb is correct?', options: ['is', 'are', 'Both are correct', 'Neither is correct'], correct: 0 },
    { question: 'In the sentence "Either the cats or the dog (has/have) been in the garden," which verb is correct and why?', options: ['has, because "dog" is the nearer subject and is singular', 'have, because there are multiple animals', 'has, because "cats" is plural', 'have, because "either" is always plural'], correct: 0 },
    { question: 'Which of the following indefinite pronouns is always singular on the SAT?', options: ['Both', 'Several', 'Each', 'Many'], correct: 2 },
    { question: 'A "who" vs. "whom" question appears on the SAT. "Who" is used as the subject of a clause, while "whom" is used as:', options: ['A verb', 'The object of a verb or preposition', 'A conjunction', 'A possessive pronoun'], correct: 1 },
    { question: 'Which sentence contains a restrictive (essential) clause?', options: ['My brother, who lives in Chicago, is visiting.', 'Students who study regularly perform better.', 'Paris, the capital of France, is beautiful.', 'The teacher, Ms. Rivera, gave extra credit.'], correct: 1 }
  ],
  'December': [
    { question: 'Which comma rule applies to this sentence: "After the storm, the sun appeared"?', options: ['Series/items in a list', 'Coordinating conjunction between independent clauses', 'Introductory element', 'Non-restrictive clause'], correct: 2 },
    { question: 'A semicolon is used correctly in which of the following sentences?', options: ['She bought apples; bananas; and oranges.', 'It was late; we were tired.', 'Although it rained; we went outside.', 'The best student was; however, absent.'], correct: 1 },
    { question: 'Which sentence uses a colon correctly?', options: ['The colors were: red, blue, and green.', 'Three planets are visible tonight: Venus, Mars, and Jupiter.', 'She said: hello to everyone.', 'The answer is: 42.'], correct: 1 },
    { question: 'Which of the following is a common SAT trap involving commas?', options: ['Using a comma after "and"', 'Placing a comma between the subject and verb', 'Using a comma at the end of a sentence', 'Placing a comma before the first word'], correct: 1 },
    { question: 'Dashes can replace which punctuation mark to set off a non-restrictive clause with extra emphasis?', options: ['A period', 'A question mark', 'A pair of commas or parentheses', 'A semicolon'], correct: 2 }
  ],
  'January': [
    { question: 'Which transition word signals a contrast relationship between two ideas?', options: ['Furthermore', 'However', 'Therefore', 'Similarly'], correct: 1 },
    { question: 'An SAT "rhetorical goal" question asks you to revise a sentence to be more specific. The best revision will:', options: ['Use bigger words', 'Replace vague language with concrete details', 'Make the sentence shorter', 'Add a semicolon'], correct: 1 },
    { question: 'Which transition indicates a cause-and-effect relationship?', options: ['Nevertheless', 'In contrast', 'Consequently', 'For example'], correct: 2 },
    { question: 'When an SAT question asks whether a sentence should be added to a paragraph, you should evaluate whether the sentence:', options: ['Uses advanced vocabulary', 'Supports the passage\'s central purpose', 'Is the longest sentence available', 'Contains a transition word'], correct: 1 },
    { question: 'A "logical sequence" question asks which sentence best fits between two given sentences. The correct answer will:', options: ['Be the most entertaining option', 'Logically bridge the ideas of the sentence before and after', 'Introduce an entirely new topic', 'Repeat the first sentence in different words'], correct: 1 }
  ],
  'February': [
    { question: 'The Common App essay has a maximum word count of:', options: ['500 words', '550 words', '650 words', '750 words'], correct: 2 },
    { question: 'According to the curriculum, what three qualities do college essays primarily seek from applicants?', options: ['Intelligence, humor, and creativity', 'Authenticity, growth, and specificity', 'Formal language, length, and citations', 'Achievements, awards, and grades'], correct: 1 },
    { question: 'When brainstorming a personal essay topic, which approach is most effective?', options: ['Write about a famous person you admire', 'Choose the prompt that sounds easiest', 'Identify moments from your life that reveal character and perspective', 'Use a template from the internet'], correct: 2 },
    { question: 'During the revision process for a college essay, which action is most important?', options: ['Add more big words to sound smarter', 'Cut fluff, sharpen your voice, and strengthen opening and closing lines', 'Make sure the essay is exactly 650 words', 'Include as many accomplishments as possible'], correct: 1 },
    { question: 'Supplemental essays for college applications typically range from:', options: ['1,000 to 2,000 words', '150 to 300 words', '500 to 650 words', '50 to 75 words'], correct: 1 }
  ],
  'March': [
    { question: 'The word "pragmatic" most nearly means:', options: ['Idealistic and dreamy', 'Practical and focused on results', 'Emotional and sensitive', 'Confusing and ambiguous'], correct: 1 },
    { question: 'The Greek root "chron-" appears in words like "chronology" and "chronic." What does this root mean?', options: ['Life', 'Time', 'Write', 'Self'], correct: 1 },
    { question: 'When reading dense 19th-century literary fiction for the SAT, which strategy is most effective?', options: ['Read every word at the same speed', 'Parse long, complex sentences by identifying the main subject and verb first', 'Skip unfamiliar words entirely', 'Only read the first and last paragraphs'], correct: 1 },
    { question: 'The word "equivocal" most nearly means:', options: ['Clear and direct', 'Open to more than one interpretation', 'Loud and emphatic', 'Relating to horses'], correct: 1 },
    { question: 'When scanning a complex science passage, which structure should you trace for efficiency?', options: ['Alphabetical order of terms', 'Hypothesis, methods, results, conclusion', 'Chronological order of publication', 'Paragraph length from shortest to longest'], correct: 1 }
  ],
  'April': [
    { question: 'On the Digital SAT Reading & Writing section, you have 64 minutes for 54 questions. This gives you approximately how much time per question?', options: ['1 minute exactly', '1 minute 11 seconds', '1 minute 30 seconds', '45 seconds'], correct: 1 },
    { question: 'Which annotation technique is recommended for efficient SAT reading?', options: ['Highlighting every sentence in the passage', 'Underlining claims, circling transitions, and boxing key evidence', 'Writing a full summary of each paragraph', 'Skipping annotation to save time'], correct: 1 },
    { question: 'On the adaptive Digital SAT, how does Module 2 difficulty relate to Module 1?', options: ['Module 2 is always easier', 'Module 2 is always the same difficulty', 'Module 2 difficulty adjusts based on Module 1 performance', 'Module 2 is randomly selected'], correct: 2 },
    { question: 'When applying process of elimination to SAT Reading questions, which type of answer should you eliminate first?', options: ['The longest answer choice', 'Answers that are implausible, too extreme, or out of scope', 'Answers that use unfamiliar vocabulary', 'The shortest answer choice'], correct: 1 },
    { question: 'The Digital SAT Reading & Writing section tests four content domains. Which of the following is NOT one of them?', options: ['Craft & Structure', 'Information & Ideas', 'Creative Writing', 'Standard English Conventions'], correct: 2 }
  ],
  'May': [
    { question: 'An error pattern analysis of your SAT practice tests should categorize mistakes by which two dimensions?', options: ['Passage length and difficulty rating', 'Content domain and error type', 'Time spent and question number', 'Passage topic and author name'], correct: 1 },
    { question: 'When researching colleges, which of the following is a strategic consideration?', options: ['Which school has the best mascot', 'Early decision vs. regular decision deadlines', 'Which school your friends are applying to', 'Which school has the best cafeteria food'], correct: 1 },
    { question: 'For targeted SAT score improvement, the curriculum recommends how many practice problems per identified weak area?', options: ['5', '10', '20', '50'], correct: 2 },
    { question: 'Which of the following should be completed before requesting letters of recommendation?', options: ['Submitting all college applications', 'Researching each college\'s requirements and giving recommenders adequate notice', 'Writing the recommenders\' letters for them', 'Waiting until the week of the deadline'], correct: 1 },
    { question: 'When completing a targeted question sprint on weak SAT RW question types, what is the recommended total question count?', options: ['10 questions', '25 questions', '50 questions', '100 questions'], correct: 2 }
  ],
  'June': [
    { question: 'A full Digital SAT simulation should include which of the following?', options: ['Only the Reading & Writing section', 'Both the Math and Reading & Writing sections under real conditions', 'Just the hardest questions from each section', 'Only the modules you feel least confident about'], correct: 1 },
    { question: 'After receiving a practice SAT score, what should you consider when deciding whether to retest?', options: ['Whether your friends scored higher', 'Whether your score meets your college goals and if improvement is realistic', 'Whether you felt tired during the test', 'Whether the test was on a good day'], correct: 1 },
    { question: 'Before submitting college applications, which final step is essential?', options: ['Adding more extracurricular activities', 'Proofreading all essays and confirming all requirements are met', 'Rewriting your essays from scratch', 'Removing all personal voice from essays'], correct: 1 },
    { question: 'A senior year academic plan might include which of the following?', options: ['AP exam prep only', 'Dual enrollment only', 'Scholarship applications only', 'AP exam prep, dual enrollment, and scholarship applications'], correct: 3 },
    { question: 'Looking back at the entire SAT Reading & Writing curriculum this year, which skills did you develop?', options: ['Grammar and punctuation mastery', 'Reading comprehension and inference', 'Timed test strategy and essay writing', 'All of the above!'], correct: 3 }
  ]
}


  };
  // ========================= QUIZ RENDERING =========================

  var FREE_MONTH = 'September';

  function hasProAccess() {
    if (typeof CuricaaAuth === 'undefined') return false;
    var user = CuricaaAuth.getUser();
    if (!user) return false;
    return user.plan === 'pro';
  }

  function getActiveMonth() {
    var activeTab = document.querySelector('.month-tab.active');
    return activeTab ? activeTab.textContent.trim() : FREE_MONTH;
  }

  function getQuizData(month) {
    if (!QUIZ_DATA[pageKey]) return null;
    return QUIZ_DATA[pageKey][month] || null;
  }

  // Get saved quiz results
  function getSavedResults() {
    try {
      return JSON.parse(localStorage.getItem('curicaa_quiz_' + pageKey) || '{}');
    } catch(e) { return {}; }
  }
  function saveResult(month, score, total) {
    var results = getSavedResults();
    results[month] = { score: score, total: total, date: new Date().toISOString() };
    localStorage.setItem('curicaa_quiz_' + pageKey, JSON.stringify(results));
  }

  // Create quiz section HTML
  function createQuizHTML(month, questions, isFree) {
    if (!questions || questions.length === 0) return '';

    var savedResults = getSavedResults();
    var hasSaved = savedResults[month];
    var isLocked = !isFree && !hasProAccess();

    var html = '<div class="quiz-section" style="margin-top:24px;' + (isLocked ? 'position:relative;' : '') + '">';

    // Quiz header
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">';
    html += '<div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#a78bfa,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(167,139,250,0.3);">';
    html += '<i class="fas fa-clipboard-check" style="font-size:17px;color:white;"></i>';
    html += '</div>';
    html += '<div>';
    html += '<h4 style="font-size:16px;font-weight:700;color:' + (isLocked ? 'rgba(255,255,255,0.4)' : 'var(--ct)') + ';">End-of-Month Quiz</h4>';
    html += '<p style="font-size:12px;color:var(--ct7);">' + questions.length + ' questions covering this month\'s weekly topics';
    if (isFree) {
      html += ' <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);font-size:10px;font-weight:600;color:#4ade80;margin-left:6px;"><i class="fas fa-unlock" style="font-size:8px;"></i> Free</span>';
    } else if (!isLocked) {
      html += ' <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.2);font-size:10px;font-weight:600;color:#a78bfa;margin-left:6px;"><i class="fas fa-crown" style="font-size:8px;"></i> Pro</span>';
    }
    html += '</p>';
    html += '</div>';
    html += '</div>';

    if (isLocked) {
      // Locked state -- blurred quiz preview
      html += '<div style="position:relative;border-radius:14px;overflow:hidden;">';
      html += '<div style="filter:blur(5px);pointer-events:none;opacity:0.5;">';

      // Show blurred preview of questions (just the first 2-3)
      for (var p = 0; p < Math.min(3, questions.length); p++) {
        html += '<div style="background:var(--cs1);border:1px solid var(--br1);border-radius:11px;padding:14px 16px;margin-bottom:10px;">';
        html += '<p style="font-size:13px;font-weight:600;color:var(--ct2);margin-bottom:8px;">' + (p + 1) + '. ' + questions[p].question + '</p>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">';
        for (var o = 0; o < questions[p].options.length; o++) {
          html += '<div style="padding:8px 12px;border-radius:8px;border:1px solid var(--br1);background:var(--cs2);font-size:12px;color:var(--ct4);">' + questions[p].options[o] + '</div>';
        }
        html += '</div>';
        html += '</div>';
      }
      html += '<p style="text-align:center;font-size:11px;color:var(--ct8);">+ ' + (questions.length - 3) + ' more questions...</p>';

      html += '</div>'; // end blur wrapper

      // Lock overlay
      html += '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(15,17,25,0.6);backdrop-filter:blur(2px);z-index:2;">';
      html += '<div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#6366f1);display:flex;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:0 0 24px rgba(167,139,250,0.3);">';
      html += '<i class="fas fa-crown" style="font-size:18px;color:white;"></i>';
      html += '</div>';
      html += '<p style="font-size:15px;font-weight:700;color:white;margin-bottom:6px;">Pro Feature</p>';
      html += '<p style="font-size:12px;color:rgba(255,255,255,0.55);text-align:center;max-width:260px;line-height:1.5;">Upgrade to <strong style="color:#a78bfa;">Curicaa Pro</strong> to unlock end-of-month quizzes with instant scoring for every subject.</p>';
      html += '<a href="hub.html#pricing" style="display:inline-flex;align-items:center;gap:6px;padding:10px 22px;border-radius:10px;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:white;font-size:13px;font-weight:600;text-decoration:none;margin-top:14px;box-shadow:0 4px 16px rgba(139,92,246,0.3);transition:opacity 0.2s;" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'"><i class="fas fa-arrow-right" style="font-size:11px;"></i> Upgrade to Pro</a>';
      html += '</div>'; // end lock overlay

      html += '</div>'; // end position:relative wrapper
    } else {
      // Unlocked -- full interactive quiz
      html += '<div class="quiz-interactive" data-month="' + month + '">';

      // Questions
      for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        html += '<div class="quiz-question" data-q="' + i + '" style="background:var(--cs1);border:1px solid var(--br1);border-radius:11px;padding:16px;margin-bottom:10px;transition:border-color 0.2s;">';
        html += '<p style="font-size:13px;font-weight:700;color:var(--ct);margin-bottom:10px;">' + (i + 1) + '. ' + q.question + '</p>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
        for (var j = 0; j < q.options.length; j++) {
          var optLabel = String.fromCharCode(65 + j); // A, B, C, D
          html += '<button type="button" class="quiz-option" data-q="' + i + '" data-o="' + j + '" onclick="event.stopPropagation();QuizEngine.selectOption(' + i + ',' + j + ')" style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.09);background:rgba(255,255,255,0.045);color:var(--ct2);font-size:13px;cursor:pointer;transition:all 0.2s;text-align:left;font-family:inherit;-webkit-appearance:none;appearance:none;">';
          html += '<span class="opt-circle" style="width:24px;height:24px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;color:var(--ct5);">' + optLabel + '</span>';
          html += '<span>' + q.options[j] + '</span>';
          html += '</button>';
        }
        html += '</div>';
        // Feedback area (hidden initially)
        html += '<div class="quiz-feedback" data-q="' + i + '" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.5;"></div>';
        html += '</div>';
      }

      // Submit button + results
      html += '<div style="text-align:center;margin-top:16px;">';
      html += '<button type="button" class="quiz-submit-btn" onclick="QuizEngine.submitQuiz()" style="padding:12px 32px;border-radius:11px;border:none;background:linear-gradient(135deg,#a78bfa,#6366f1);color:white;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(167,139,250,0.3);transition:opacity 0.2s,transform 0.18s;font-family:inherit;" onmouseover="this.style.opacity=\'0.88\';this.style.transform=\'scale(1.03)\'" onmouseout="this.style.opacity=\'1\';this.style.transform=\'scale(1)\'">';
      html += '<i class="fas fa-check-circle" style="margin-right:6px;"></i>Submit Answers';
      html += '</button>';
      html += '</div>';

      // Results panel (hidden)
      html += '<div class="quiz-results" style="display:none;margin-top:16px;background:var(--cs1);border:1px solid var(--br1);border-radius:14px;padding:20px;text-align:center;">';
      html += '<div style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;" class="quiz-result-icon"></div>';
      html += '<p style="font-size:20px;font-weight:800;margin-bottom:4px;" class="quiz-result-score"></p>';
      html += '<p style="font-size:13px;color:var(--ct5);margin-bottom:14px;" class="quiz-result-msg"></p>';
      html += '<button onclick="QuizEngine.resetQuiz()" style="padding:10px 24px;border-radius:10px;border:1px solid var(--br1);background:var(--cs2);color:var(--ct3);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.2s;" onmouseover="this.style.borderColor=\'rgba(167,139,250,0.4)\'" onmouseout="this.style.borderColor=\'var(--br1)\'"><i class="fas fa-redo" style="margin-right:6px;font-size:11px;"></i>Retake Quiz</button>';
      html += '</div>';

      html += '</div>'; // end quiz-interactive
    }

    html += '</div>'; // end quiz-section

    return html;
  }

  // ========================= QUIZ ENGINE =========================
  var selectedAnswers = {};
  var quizSubmitted = false;

  // Confetti burst -- small, fast, fun
  function launchMiniConfetti() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Find the quiz results panel center for origin
    var resultsPanel = document.querySelector('.quiz-results');
    var originX = canvas.width / 2;
    var originY = canvas.height / 2;
    if (resultsPanel) {
      var rect = resultsPanel.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    var particles = [];
    var colors = ['#a78bfa','#8b5cf6','#4ade80','#22d3ee','#d4a54a','#fb923c','#f472b6','#60a5fa','#fde047'];
    for (var i = 0; i < 80; i++) {
      var angle = (Math.random() * Math.PI * 2);
      var speed = 3 + Math.random() * 8;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        w: 3 + Math.random() * 5,
        h: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.25 + Math.random() * 0.15,
        opacity: 1
      });
    }
    var frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx *= 0.98;
        if (frame > 30) p.opacity -= 0.02;
        if (p.opacity <= 0) continue;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      frame++;
      if (alive && frame < 120) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(animate);
  }

  window.QuizEngine = {
    selectOption: function(qIndex, oIndex) {
      if (quizSubmitted) return;
      // Prevent bubbling to any parent handlers
      if (window.event) { window.event.stopPropagation(); window.event.preventDefault(); }

      selectedAnswers[qIndex] = oIndex;

      // Update UI -- highlight selected option
      var options = document.querySelectorAll('.quiz-option[data-q="' + qIndex + '"]');
      for (var k = 0; k < options.length; k++) {
        var opt = options[k];
        var oi = parseInt(opt.getAttribute('data-o'));
        var circle = opt.querySelector('.opt-circle');
        if (oi === oIndex) {
          opt.style.borderColor = 'rgba(167,139,250,0.5)';
          opt.style.background = 'rgba(167,139,250,0.12)';
          opt.style.color = 'var(--ct)';
          if (circle) { circle.style.borderColor = '#a78bfa'; circle.style.background = '#a78bfa'; circle.style.color = 'white'; }
        } else {
          opt.style.borderColor = 'rgba(255,255,255,0.09)';
          opt.style.background = 'rgba(255,255,255,0.045)';
          opt.style.color = 'var(--ct2)';
          if (circle) { circle.style.borderColor = 'rgba(255,255,255,0.15)'; circle.style.background = 'rgba(255,255,255,0.06)'; circle.style.color = 'var(--ct5)'; }
        }
      }
    },

    submitQuiz: function() {
      if (quizSubmitted) return;

      var quizSection = document.querySelector('.quiz-section');
      if (!quizSection) return;

      var month = getActiveMonth();
      var questions = getQuizData(month);
      if (!questions) return;

      // Check all answered
      var unanswered = [];
      for (var i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] === undefined) unanswered.push(i + 1);
      }
      if (unanswered.length > 0) {
        // Highlight unanswered questions
        for (var u = 0; u < unanswered.length; u++) {
          var qEl = quizSection.querySelector('.quiz-question[data-q="' + (unanswered[u] - 1) + '"]');
          if (qEl) {
            qEl.style.borderColor = 'rgba(251,146,60,0.5)';
            (function(el) {
              setTimeout(function() { el.style.borderColor = 'var(--br1)'; }, 2000);
            })(qEl);
          }
        }
        return;
      }

      quizSubmitted = true;

      // Score and show feedback per question
      var score = 0;
      for (var q = 0; q < questions.length; q++) {
        var correct = questions[q].correct;
        var selected = selectedAnswers[q];
        var isCorrect = selected === correct;

        if (isCorrect) score++;

        // Show feedback
        var feedback = quizSection.querySelector('.quiz-feedback[data-q="' + q + '"]');
        if (feedback) {
          feedback.style.display = 'block';
          if (isCorrect) {
            feedback.style.background = 'rgba(74,222,128,0.08)';
            feedback.style.border = '1px solid rgba(74,222,128,0.2)';
            feedback.style.color = '#4ade80';
            feedback.innerHTML = '<i class="fas fa-check-circle" style="margin-right:4px;"></i> Correct!';
          } else {
            feedback.style.background = 'rgba(248,113,113,0.08)';
            feedback.style.border = '1px solid rgba(248,113,113,0.2)';
            feedback.style.color = '#f87171';
            feedback.innerHTML = '<i class="fas fa-times-circle" style="margin-right:4px;"></i> The correct answer is: <strong style="color:#4ade80;">' + questions[q].options[correct] + '</strong>';
          }
        }

        // Style options to show correct/incorrect
        var opts = quizSection.querySelectorAll('.quiz-option[data-q="' + q + '"]');
        for (var o = 0; o < opts.length; o++) {
          var opt = opts[o];
          var oi = parseInt(opt.getAttribute('data-o'));
          var circle = opt.querySelector('.opt-circle');
          opt.style.cursor = 'default';
          opt.disabled = true;
          if (oi === correct) {
            opt.style.borderColor = 'rgba(74,222,128,0.5)';
            opt.style.background = 'rgba(74,222,128,0.12)';
            opt.style.color = '#4ade80';
            opt.style.opacity = '1';
            if (circle) { circle.style.borderColor = '#4ade80'; circle.style.background = '#4ade80'; circle.style.color = 'white'; circle.innerHTML = '<i class="fas fa-check" style="font-size:10px;"></i>'; }
          } else if (oi === selected && !isCorrect) {
            opt.style.borderColor = 'rgba(248,113,113,0.5)';
            opt.style.background = 'rgba(248,113,113,0.12)';
            opt.style.color = '#f87171';
            opt.style.opacity = '1';
            if (circle) { circle.style.borderColor = '#f87171'; circle.style.background = '#f87171'; circle.style.color = 'white'; circle.innerHTML = '<i class="fas fa-times" style="font-size:10px;"></i>'; }
          } else {
            opt.style.opacity = '0.35';
          }
        }
      }

      // Show results panel
      var resultsPanel = quizSection.querySelector('.quiz-results');
      if (resultsPanel) {
        resultsPanel.style.display = 'block';

        var pct = Math.round((score / questions.length) * 100);
        var resultIcon = resultsPanel.querySelector('.quiz-result-icon');
        var resultScore = resultsPanel.querySelector('.quiz-result-score');
        var resultMsg = resultsPanel.querySelector('.quiz-result-msg');

        resultScore.textContent = score + ' / ' + questions.length + ' (' + pct + '%)';

        if (pct === 100) {
          resultIcon.style.background = 'linear-gradient(135deg,#4ade80,#22d3ee)';
          resultIcon.innerHTML = '<i class="fas fa-trophy" style="font-size:24px;color:white;"></i>';
          resultMsg.textContent = 'Perfect score! You\'ve mastered this month\'s material!';
        } else if (pct >= 80) {
          resultIcon.style.background = 'linear-gradient(135deg,#4ade80,#22d3ee)';
          resultIcon.innerHTML = '<i class="fas fa-star" style="font-size:24px;color:white;"></i>';
          resultMsg.textContent = 'Great job! You have a strong understanding of this month\'s topics.';
        } else if (pct >= 60) {
          resultIcon.style.background = 'linear-gradient(135deg,#d4a54a,#f97316)';
          resultIcon.innerHTML = '<i class="fas fa-thumbs-up" style="font-size:24px;color:white;"></i>';
          resultMsg.textContent = 'Good effort! Review the topics you missed to strengthen your understanding.';
        } else {
          resultIcon.style.background = 'linear-gradient(135deg,#f87171,#ef4444)';
          resultIcon.innerHTML = '<i class="fas fa-book-open" style="font-size:24px;color:white;"></i>';
          resultMsg.textContent = 'Keep studying! Go back through the weekly lessons and try again.';
        }

        // Scroll results into view smoothly
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Hide submit button
      var submitBtn = quizSection.querySelector('.quiz-submit-btn');
      if (submitBtn) submitBtn.style.display = 'none';

      // Confetti for good scores (0 or 1 wrong)
      if (score >= questions.length - 1) {
        setTimeout(function() { launchMiniConfetti(); }, 300);
      }

      // Save result
      saveResult(month, score, questions.length);
    },

    resetQuiz: function() {
      selectedAnswers = {};
      quizSubmitted = false;

      var quizSection = document.querySelector('.quiz-section');
      if (!quizSection) return;

      // Reset all options
      var opts = quizSection.querySelectorAll('.quiz-option');
      for (var i = 0; i < opts.length; i++) {
        var opt = opts[i];
        opt.style.borderColor = 'rgba(255,255,255,0.09)';
        opt.style.background = 'rgba(255,255,255,0.045)';
        opt.style.color = 'var(--ct2)';
        opt.style.cursor = 'pointer';
        opt.style.opacity = '1';
        opt.disabled = false;
        var circle = opt.querySelector('.opt-circle');
        if (circle) {
          circle.style.borderColor = 'rgba(255,255,255,0.15)';
          circle.style.background = 'rgba(255,255,255,0.06)';
          circle.style.color = 'var(--ct5)';
          // Restore the letter label
          var oi = parseInt(opt.getAttribute('data-o'));
          circle.innerHTML = String.fromCharCode(65 + oi);
        }
      }

      // Hide feedback
      var fbs = quizSection.querySelectorAll('.quiz-feedback');
      for (var j = 0; j < fbs.length; j++) { fbs[j].style.display = 'none'; }

      // Hide results
      var resultsPanel = quizSection.querySelector('.quiz-results');
      if (resultsPanel) resultsPanel.style.display = 'none';

      // Show submit button
      var submitBtn = quizSection.querySelector('.quiz-submit-btn');
      if (submitBtn) submitBtn.style.display = '';
    }
  };

  // ========================= INJECTION =========================

  var currentQuizMonth = '';

  function injectQuiz() {
    var contentEl = document.getElementById('monthContent');
    if (!contentEl) return;

    var month = getActiveMonth();

    // Skip if month hasn't changed and quiz already exists
    if (month === currentQuizMonth && contentEl.querySelector('.quiz-section')) return;

    currentQuizMonth = month;

    var questions = getQuizData(month);
    if (!questions) {
      // Remove old quiz if any
      var oldQuiz = contentEl.querySelector('.quiz-section');
      if (oldQuiz) oldQuiz.remove();
      return;
    }

    // Remove old quiz section
    var existing = contentEl.querySelector('.quiz-section');
    if (existing) existing.remove();

    var isFree = (month === FREE_MONTH);
    var quizHTML = createQuizHTML(month, questions, isFree);

    // Append quiz after the main content
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = quizHTML;
    var quizEl = tempDiv.firstElementChild;
    if (!quizEl) return;

    // Find a good insertion point -- after the month-grid
    var monthGrid = contentEl.querySelector('.month-grid');
    if (monthGrid && monthGrid.parentElement) {
      // Insert after the month-grid's next sibling (nav buttons area)
      var insertAfter = monthGrid;
      // Walk past siblings that are part of the nav/buttons area
      while (insertAfter.nextSibling && insertAfter.nextSibling.nodeType === 1) {
        var sib = insertAfter.nextSibling;
        // Stop before the next major section
        if (sib.classList && sib.classList.contains('quiz-section')) break;
        insertAfter = sib;
      }
      if (insertAfter.parentElement) {
        insertAfter.parentElement.insertBefore(quizEl, insertAfter.nextSibling);
      }
    } else {
      contentEl.appendChild(quizEl);
    }

    // Reset quiz state for new month
    selectedAnswers = {};
    quizSubmitted = false;
  }

  // Observe month tab changes to re-inject quiz
  function initQuizObserver() {
    var contentEl = document.getElementById('monthContent');
    if (!contentEl) return;

    var observer = new MutationObserver(function() {
      setTimeout(function() {
        injectQuiz();
      }, 100);
    });
    observer.observe(contentEl, { childList: true, subtree: true });
  }

  // ========================= BOOT =========================

  function boot() {
    // Wait for curriculum to render
    setTimeout(function() {
      injectQuiz();
      initQuizObserver();
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { boot(); });
  } else {
    boot();
  }

})();
