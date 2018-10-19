// @gokuvinoth
//   create final element and append to display the full content in HTML
let stubData = {
  status: {
    status: 'success',
    message: 'Successfully retrieved movies'
  },
  content: [
    {
      _id: '1',
      title: 'Kadaikutty Singam',
      language: 'Tamil',
      rating: 2.9,
      duration: 230,
      sessions: [
        {
          sessionDateTime: [
            '2017-12-08T17:09:21.627Z',
            '2017-12-08T17:10:21.627Z',
            '2018-12-12T17:09:21.627Z'
          ],
          _id: '58c03ac18160196ca0b51d51',
          movie: '5bc6f8ffe6977f003ebcaab5',
          cinema: {
            _id: '56c03ac18060297ca0b52c53',
            name: 'Village',
            state: 'TAS',
            location: 'Hobart',
            website: 'https://www.villagecinemas.com.au'
          },
          ticketLink: 'https://www.village/Orders/Tickets#sessionId=9032724'
        }
      ],
      tags: ['Kollywood', 'Tamil', 'Farmers'],
      genres: ['Romance', 'Comedy', 'Family', 'Action'],
      poster: 'https://image.tmdb.org/t/p/w500/iNeOevqxOrqwWJUJS2EIuufVf0B.jpg',
      trailer: 'https://www.youtube.com/watch?v=6TFiphg9Af8',
      synopsis:
        'Gunasingam, a family-loving farmer who hails from a small town, tries his best to keep his big family united despite him being misunderstood by many.',
      crew: {
        director: ['Pandiraj'],
        musicDirector: ['D. Imman']
      },
      leadActors: [
        'Karthi',
        'Sayesha Saigal',
        'Priya Bhavani Shankar',
        'Sathyaraj'
      ],
      cast: [
        'Karthi',
        'Sayesha Saigal',
        'Priya Bhavani Shankar',
        'Sathyaraj',
        'Soori',
        'Arthana Binu',
        'Mounica',
        'Yuvarani',
        'Bhanupriya',
        'Viji Chandrasekhar',
        'Ponvannan',
        'Soundara Raja',
        'Ilavarasu',
        'John Vijay',
        'Saravanan',
        'G. Marimuthu',
        'Indhu',
        'Krishnamoorthy',
        'Veera Samar',
        'Sriman',
        'Suriya ',
        'R. Velraj'
      ],
      slug: 'Kadaikutty_Singam'
    },
    {
      _id: '2',
      title: 'Night School',
      language: 'English',
      rating: 3.2,
      sessions: [],
      tags: [],
      genres: ['Comedy'],
      poster: 'https://image.tmdb.org/t/p/w500/1NSMAaBPSbWv7sGmF8oLGMNb8Qm.jpg',
      trailer: 'https://www.youtube.com/watch?v=t9QtXGirWf0',
      synopsis:
        "Teddy Walker is a successful salesman whose life takes an unexpected turn when he accidentally blows up his place of employment. Forced to attend night school to get his GED, Teddy soon finds himself dealing with a group of misfit students, his former high school nemesis and a feisty teacher who doesn't think he's too bright.",
      crew: {
        director: ['Malcolm D. Lee'],
        musicDirector: []
      },
      leadActors: [
        'Kevin Hart',
        'Tiffany Haddish',
        'Rob Riggle',
        'Yvonne Orji'
      ],
      cast: [
        'Kevin Hart',
        'Tiffany Haddish',
        'Rob Riggle',
        'Yvonne Orji',
        'Mary Lynn Rajskub',
        'Ben Schwartz',
        'Megalyn Echikunwoke',
        'Anne Winters',
        'Keith David',
        'Taran Killam',
        'Mason Guccione',
        'Romany Malco',
        'Bresha Webb',
        'Brooke Butler',
        'Matilda Del Toro',
        'Melissa LeEllen',
        'Al Madrigal',
        'Donna Biscoe',
        'David Dunston',
        'Owen Harn',
        'Brian Kayode-Patrick Johnson'
      ]
    },
    {
      _id: '3',
      title: 'Lionheart',
      language: 'Spanish',
      sessions: [],
      tags: [],
      genres: ['Action', 'Thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/6dVDVZ5nUAVgj23qSWFUqzRaZrx.jpg',
      trailer: 'https://www.youtube.com/watch?v=XZ4x4HqSGFk',
      synopsis:
        'Lyon Gaultier is a deserter in the Foreign Legion arriving in the USA entirely hard up. He finds his brother between life and death and his sister-in-law without the money needed to heal her husband and to maintain her child. To earn the money needed, Gaultier decides to take part in some very dangerous clandestine fights.',
      crew: {
        director: ['Sheldon Lettich'],
        musicDirector: ['John Scott']
      },
      leadActors: [
        'Jean-Claude Van Damme',
        'Harrison Page',
        'Deborah Rennard',
        'Ashley Johnson'
      ],
      cast: [
        'Jean-Claude Van Damme',
        'Harrison Page',
        'Deborah Rennard',
        'Ashley Johnson',
        'Brian Thompson',
        'Lisa Pelikan',
        'Billy Blanks',
        'Tony Halme'
      ]
    },
    {
      _id: '4',
      title: 'First Man',
      language: 'English',
      sessions: [],
      tags: [],
      genres: ['History', 'Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/2MrNHzN4q9fB5OHlbv3HrzujnUx.jpg',
      trailer: 'https://www.youtube.com/watch?v=O9Y7DTCn7Cc',
      synopsis:
        'A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.',
      crew: {
        director: ['Damien Chazelle'],
        musicDirector: ['Justin Hurwitz']
      },
      leadActors: [
        'Ryan Gosling',
        'Claire Foy',
        'Corey Stoll',
        'Kyle Chandler'
      ],
      cast: [
        'Ryan Gosling',
        'Claire Foy',
        'Corey Stoll',
        'Kyle Chandler',
        'Jason Clarke',
        'Shea Whigham',
        'Christopher Abbott',
        "Brian d'Arcy James",
        'Pablo Schreiber',
        'Patrick Fugit',
        'Cory Michael Smith',
        'Skyler Bible',
        'Lukas Haas',
        'Brady Smith',
        'J.D. Evermore',
        'Steve Coulter',
        'Olivia Hamilton',
        'Stephanie Turner',
        'Kris Swanberg',
        'Perry Zulu Jr.',
        'Dustin Lewis',
        'Gavin Warren',
        'Shawn Eric Jones',
        'Kent Wagner',
        'Michael Lee Kimel',
        'Greg Puckett',
        'John David Whalen',
        'Luke Winters',
        'Choppy Guillotte',
        'Anthony Paolucci',
        'Braydyn Nash Helms',
        'Caroline Davis',
        'Ben Owen',
        'Lucy Stafford',
        'Katelyn Davis',
        'Edmund Grant',
        'Willie Repoley',
        'Callie Brown',
        'Connor Blodgett',
        'George Linkenback',
        'Claire Smith',
        'Ethan Embry',
        'Ciarán Hinds',
        'Leon Bridges'
      ]
    },
    {
      _id: '5',
      title: 'Incredibles 2',
      language: 'English',
      sessions: [],
      tags: [],
      genres: ['Action', 'Adventure', 'Animation', 'Family'],
      poster: 'https://image.tmdb.org/t/p/w500/x1txcDXkcM65gl7w20PwYSxAYah.jpg',
      trailer: 'https://www.youtube.com/watch?v=ZJDMWVZta3M',
      synopsis:
        'Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet – taking care of the problems of his three children.',
      crew: {
        director: ['Brad Bird'],
        musicDirector: []
      },
      leadActors: [
        'Craig T. Nelson',
        'Holly Hunter',
        'Sarah Vowell',
        'Huck Milner'
      ],
      cast: [
        'Craig T. Nelson',
        'Holly Hunter',
        'Sarah Vowell',
        'Huck Milner',
        'Samuel L. Jackson',
        'Eli Fucile',
        'Nicholas Bird',
        'Bob Odenkirk',
        'Catherine Keener',
        'Bill Wise',
        'Brad Bird',
        'Jonathan Banks',
        'Michael Bird',
        'Sophia Bush',
        'Phil LaMarr',
        'Paul Eiding',
        'Isabella Rossellini',
        'John Ratzenberger',
        'Barry Bostwick',
        'Jere Burns',
        'Adam Rodríguez',
        'Kimberly Adair Clark',
        'Usher Raymond',
        'Adam Gates',
        'LaTanya Richardson Jackson',
        'Debi Derryberry',
        'Fred Tatasciore',
        'Alyson Stoner',
        'Michael B. Johnson'
      ]
    },
    {
      _id: '6',
      title: 'Titanic',
      language: 'English',
      rating: 8,
      duration: 210,
      sessions: [
        {
          sessionDateTime: [
            '2017-03-08T17:09:21.627Z',
            '2017-03-08T17:10:21.627Z',
            '2018-03-08T17:09:21.627Z'
          ],
          _id: '58c03ac18060196ca1b51d51',
          movie: '5bc6a228b703d1d79075c26f',
          cinema: {
            _id: '58c03ac18060197ca0b52c51',
            name: 'Dendy',
            state: 'ACT',
            location: 'Canberra',
            website: 'https://www.dendy.com.au/'
          },
          ticketLink:
            'https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9032724'
        },
        {
          sessionDateTime: [
            '2016-03-08T17:09:21.627Z',
            '2018-03-08T17:10:21.627Z',
            '2017-03-08T17:09:21.627Z'
          ],
          _id: '56c03ac18060297ca0b52c50',
          movie: '5bc6a228b703d1d79075c26f',
          cinema: {
            _id: '56c03ac18060297ca0b52c52',
            name: 'Hoyts LUX',
            state: 'VIC',
            location: 'Melbourne',
            website: 'https://www.dendy.com.au/'
          },
          ticketLink: 'https://someticket.site'
        }
      ],
      tags: ['Holloywood', 'Period', 'Real Storay'],
      genres: ['Adventure', 'Science Fiction', 'Action', 'Fantasy'],
      poster: 'https://image.tmdb.org/t/p/w500/f9iH7Javzxokvnkiz2yHD1dcmUy.jpg',
      trailer: 'https://www.youtube.com/watch?v=CHekzSiZjrY',
      synopsis:
        '84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.',
      crew: {
        director: ['Joe Russo', 'Anthony Russo'],
        musicDirector: ['Alan Silvestri']
      },
      leadActors: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
      cast: [
        'Robert Downey Jr.',
        'Chris Hemsworth',
        'Mark Ruffalo',
        'Chris Evans',
        'Scarlett Johansson',
        'Don Cheadle'
      ],
      slug: '_Titanic'
    },
    {
      _id: '7',
      title: 'Venom',
      language: 'English',
      rating: 3,
      duration: 120,
      sessions: [
        {
          sessionDateTime: [
            '2016-03-08T17:09:21.627Z',
            '2018-03-08T17:10:21.627Z',
            '2017-03-08T17:09:21.627Z'
          ],
          _id: '56c03ac18060297ca0b52c53',
          movie: '5bc6a228b703d1d79175c26f',
          cinema: {
            _id: '56c03ac18060297ca0b52c52',
            name: 'Hoyts LUX',
            state: 'VIC',
            location: 'Melbourne',
            website: 'https://www.dendy.com.au/'
          },
          ticketLink: 'https://someticket.site'
        },
        {
          sessionDateTime: [
            '2017-10-08T17:09:21.627Z',
            '2017-10-08T17:10:21.627Z',
            '2018-10-08T17:09:21.627Z'
          ],
          _id: '58c03ac18060196ca0b51d51',
          movie: '5bc6a228b703d1d79175c26f',
          cinema: {
            _id: '56c03ac18060297ca0b52c52',
            name: 'Hoyts LUX',
            state: 'VIC',
            location: 'Melbourne',
            website: 'https://www.dendy.com.au/'
          },
          ticketLink:
            'https://www.eventcinemas.com.au/Orders/Tickets#sessionId=9032724'
        },
        {
          sessionDateTime: [
            '2016-10-08T17:09:21.627Z',
            '2018-10-08T17:10:21.627Z',
            '2017-10-08T17:09:21.627Z'
          ],
          _id: '56c03ac18060296ca0b52c53',
          movie: '5bc6a228b703d1d79175c26f',
          cinema: null,
          ticketLink: 'https://someticket.site'
        }
      ],
      tags: ['Holloywood', 'Period', 'Real Storay'],
      genres: ['Horror', 'Science Fiction', 'Action', 'Thriller', 'Comedy'],
      poster: 'https://www.youtube.com/watch?v=dzxFdtWmjto',
      trailer: 'https://www.youtube.com/watch?v=dzxFdtWmjto',
      synopsis:
        'When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego “Venom” to save his life.',
      crew: {
        director: ['Ruben Fleischer'],
        musicDirector: ['Ludwig Göransson']
      },
      leadActors: ['Tom Hardy', 'Michelle Williams', 'Riz Ahmed', 'Scott Haze'],
      cast: [
        'Tom Hardy',
        'Michelle Williams',
        'Riz Ahmed',
        'Scott Haze',
        'Reid Scott',
        'Jenny Slate',
        'Melora Walters',
        "Chris O'Hara",
        'Woody Harrelson',
        'Stan Lee',
        'Sope Aluko',
        'Scott Deckert',
        'Marcella Bragio',
        'Michelle Lee',
        'Mac Brandt',
        'Christian Convery',
        'Sam Medina'
      ],
      slug: 'Venom '
    },
    {
      _id: '8',
      title: 'Black Panther',
      language: 'English',
      sessions: [],
      tags: [],
      genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
      poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
      trailer: 'https://www.youtube.com/watch?v=xjDjIWPwcPU',
      synopsis:
        "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan 'special forces') and an American secret agent, to prevent Wakanda from being dragged into a world war.",
      crew: {
        director: ['Ryan Coogler'],
        musicDirector: []
      },
      leadActors: [
        'Chadwick Boseman',
        'Michael B. Jordan',
        "Lupita Nyong'o",
        'Danai Gurira'
      ],
      cast: [
        'Chadwick Boseman',
        'Michael B. Jordan',
        "Lupita Nyong'o",
        'Danai Gurira',
        'Martin Freeman',
        'Daniel Kaluuya',
        'Letitia Wright',
        'Winston Duke',
        'Angela Bassett',
        'Forest Whitaker',
        'Andy Serkis',
        'John Kani',
        'Sterling K. Brown',
        'Seth Carr',
        'Denzel Whitaker',
        'Florence Kasumba',
        'Isaach De Bankolé',
        'Danny Sapani',
        'Sydelle Noel',
        'Janeshia Adams-Ginyard',
        'Jénel Stevens',
        'Shaunette Renée Wilson',
        'Stan Lee',
        'Sebastian Stan',
        'Bambadjan Bamba',
        'Jeremy Sample',
        'Sope Aluko',
        'Alexis Rhee',
        'Tahseen Ghauri',
        'Danny Chung',
        'David S. Lee',
        'Mark Ashworth',
        'Shad Gaspard',
        'William Cowboy Reed',
        'Alex Hibbert',
        'Lucy Hockings',
        'Ashton Tyler',
        'Atandwa Kani',
        'Connie Chiume',
        'Dorothy  Steel',
        'Marija Abney',
        'Maria Hippolyte',
        'Marie Mouroum',
        'Zola Williams',
        'Christine Hollingsworth',
        'Nabiyah Be',
        'Michael David Yuhl',
        'Elizabeth Elkins',
        'Raven Wynn',
        'Amechi Okocha',
        'Tony Sears',
        'Francesca Faridany',
        'Roland Kilumbu',
        'Timothy Carr',
        'Apollo GT',
        'James Siderits',
        'Travis Love',
        'Lidya Jewett',
        'Alona Leoine',
        'Kinley Fleurejuste',
        'Ofu Obekpa',
        'Michael R. Ciminna',
        'John Y Lee',
        'Byron Coolie',
        'William Walker',
        'Joseph Akharoh Jr.',
        'Stanley Aughtry',
        'Raenen Golez',
        'Leo De Rivera',
        'Tevin Beech',
        'Tari Omoro',
        'Andrea Antonio Canal',
        'David Dunston',
        'Emelita T. Gonzalez',
        'Josue Louis-Charles',
        'Isaac Phillips',
        'Trevor Noah',
        'Jamel Chambers',
        'Michael Christopher Rodney'
      ]
    },
    {
      _id: '9',
      title: 'Heart of a Lion',
      language: 'Finnish',
      sessions: [],
      tags: [],
      genres: ['Drama'],
      poster: 'https://image.tmdb.org/t/p/w500/i6sDTNs2H3Jo0Mez0Rqi8lOTSCh.jpg',
      trailer: 'https://www.youtube.com/watch?v=C3FXr17zwqA',
      synopsis:
        'Neo-Nazi falls in love with a woman who has a black son and finds himself fighting with conflicting feelings.',
      crew: {
        director: ['Dome Karukoski'],
        musicDirector: ['Jean-Paul Wall']
      },
      leadActors: [
        'Laura Birn',
        'Peter Franzén',
        'Pamela Tola',
        'Jasper Pääkkönen'
      ],
      cast: [
        'Laura Birn',
        'Peter Franzén',
        'Pamela Tola',
        'Jasper Pääkkönen',
        'Jussi Vatanen',
        'Mikko Neuvonen',
        'Laura Munsterhjelm',
        'Timo Lavikainen',
        'Jani Toivola',
        'Deogracias Masomi'
      ]
    },
    {
      _id: '10',
      title: 'Venom',
      language: 'English',
      sessions: [],
      tags: [],
      genres: ['Science Fiction', 'Action'],
      poster: 'https://image.tmdb.org/t/p/w500/bURIWlkMbzT8RdpemzCmQECo2Uh.jpg',
      trailer: 'https://www.youtube.com/watch?v=dzxFdtWmjto',
      synopsis:
        'When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego “Venom” to save his life.',
      crew: {
        director: ['Ruben Fleischer'],
        musicDirector: ['Ludwig Göransson']
      },
      leadActors: ['Tom Hardy', 'Michelle Williams', 'Riz Ahmed', 'Scott Haze'],
      cast: [
        'Tom Hardy',
        'Michelle Williams',
        'Riz Ahmed',
        'Scott Haze',
        'Reid Scott',
        'Jenny Slate',
        'Melora Walters',
        "Chris O'Hara",
        'Woody Harrelson',
        'Stan Lee',
        'Sope Aluko',
        'Scott Deckert',
        'Marcella Bragio',
        'Michelle Lee',
        'Mac Brandt',
        'Christian Convery',
        'Sam Medina',
        'Ron Cephas Jones',
        'Vickie Eng',
        'Jared Bankens',
        'Al-Jaleel Knox',
        'Grace Wan',
        'DJames Jones',
        'Jock McKissic',
        'Daniela Gaskie',
        'Apollo GT',
        'Van Marten',
        'Sailor Larocque',
        'Paul Pillsbury',
        'Kayko Thompson',
        'Laura Distin',
        'Wayne Pére',
        'Ellen Gerstein',
        'Peter Vo',
        'Donald K. Overstreet',
        'William W. Barbour',
        'Brandon Morales',
        'Michelle Fang',
        'Jane McNeill',
        'Selena Anduze',
        'Otis Winston',
        'Martin Bats Bradford',
        'Chris Ward',
        'Brandon Morales',
        'Etienne Vick',
        'Peggy Lu',
        'Diesel Madkins',
        'James J. Fuertes',
        'Amy Le',
        'Boston Rush Freeman',
        'Carl Collanus',
        'Patrick Brown',
        'Emelita T. Gonzalez',
        'Ariadne Joseph',
        'Carter Burch',
        'Khalid Ghajji',
        'Elizabeth Becka',
        'Joseph Amey',
        'Denney Pierce',
        'Chris Stein',
        'Cassie Hendry',
        'Phillip Marshall Tyler',
        'Tsi Chin Li-McCall',
        'James D. Weston II',
        'John Gettier',
        'Jake Hanson',
        'Kevin Carscallen',
        'Marquis Magwood',
        'Homero Lopez',
        'Ronnie Yelverton',
        'Ray Benitez',
        'John Ozuna',
        'Mary Lu Marr',
        'John Lobato',
        'Elgin Lee',
        'David King',
        'Paul Barlow Jr.',
        'Vaughn Myovich',
        'Rxchie',
        'Tianna Hazard',
        'Megan Aldrich',
        'Yvette Miner',
        'Buddy Rahming',
        'Deen Brooksher',
        'Michael Burgess',
        'Patrick Chundah Chu',
        'Jordan Foster',
        'David Jones',
        'Amelia Young',
        'Javier Vazquez Jr.',
        'Wade Williams',
        'Nick Thune'
      ]
    }
  ]
};

let resultElement = document.querySelector('#movies');
let APIData = [];

// Calling the movie result api

const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
     APIData = xhr.response.content;
    // function call to process api result
    //APIData = stubData.content;
    console.log(APIData);
    displayListView(APIData);
  }
};
// url to call api
xhr.open(
  'GET',
  'https://ozindianmovies.herokuapp.com/api/v1/movies/getSessions?limit=20&skip=0'
);
xhr.send();

// mapping response to respective HTML elements
renderHtml = responseData => {
  return `<div class="movie">
    <h2 class="movie-title" id=${chkNull(
      responseData._id,
      'To be Named'
    )}>${chkNull(responseData.title, 'To be Named')}</h2>
    <img class="movie-poster" id=${chkNull(
      responseData._id,
      'To be Named'
    )} src="${responseData.poster}" alt=${chkNull(
    responseData.title,
    'hero and heroine'
  )}>
    <ul class="movie-info" id=${chkNull(responseData._id, 'To be Named')}>
        <li class="movie-show-time" id=${chkNull(
          responseData._id,
          'To be Named'
        )}><a class="movie-more-info" id=${chkNull(
    responseData._id,
    'To be Named'
  )} href="#">${chkNull(
    // responseData.sessions[0].sessionDateTime[0],
    '',
    'Coming Soon'
  )}</a></li>
        <li class="movie-language" id=${chkNull(
          responseData._id,
          'To be Named'
        )}>${chkNull(responseData.language, 'All Languages')}</li>
    </ul>
</div>`;
};

const chkNull = (val, defaultVal) => {
  if (val) {
    return val;
  } else return defaultVal;
};

const displayListView = apiData => {
  resultElement.innerHTML = apiData.map(data => renderHtml(data)).join('\n');
  let thumbnails = document.querySelectorAll('#movies > div > img');
  thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
      // Set clicked image as display image.
      NavDetailview(thumbnail.id);
    });
  });
};

const NavDetailview = id => {
  let movieDetails = APIData.find(function(element) {
    return element._id === id;
  });
  console.log(movieDetails);
  console.log(movieDetails.sessions);
  let ratingCounter = [0, 0, 0];
  let totalRatingCount = movieDetails.rating;
  ratingCounter[0] = Math.floor(totalRatingCount % 5);
  ratingCounter[1] = Math.round(totalRatingCount % 1);
  ratingCounter[2] = 5 - ratingCounter[0] - ratingCounter[1];

  console.log(ratingCounter);

  // movieDetails.sessions.forEach(session => {
  //   console.log(session.state + "-" + session.location);
  //   console.log(createSessionhtml(session.sessionDateTime));
  // // });
  // let tempmovieDetails = {};
  // tempmovieDetails.sessions = [
  //   {
  //     location: 'Liverpool',
  //     state: 'NSW',
  //     sessionDateTime: ['30/10/2018 17:00']
  //   },
  //   {
  //     location: 'Paramatta',
  //     state: 'NSW',
  //     sessionDateTime: [
  //       '30/10/2018 12:00',
  //       '30/10/2018 17:00',
  //       '29/10/2018 12:00'
  //     ]
  //   },
  //   {
  //     location: 'Manuka',
  //     state: 'ACT',
  //     sessionDateTime: [
  //       '30/11/2018 17:00',
  //       '30/11/2018 19:00',
  //       '29/11/2018 17:00'
  //     ]
  //   }
  // ];
  resultElement.innerHTML = `<div class="movie-details-tcontainer" id="moviedetailscontainer">
  <div class="movie-details-trailer" id="moviedetailstrailer">
      <iframe class="movie-trailer" id="${
        movieDetails._id
      }" src="https://www.youtube.com/embed/${
    movieDetails.trailer.split('=')[1]
  }"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="movie-details-info" id="moviedetailsinfo">
      <div class="movie-info-list" id="movieinfolist">
          <div class="movie-genre" id="moviegenre"><span class="genre-detail" id="genredetail">Genre :</span>
              ${movieDetails.genres}</div>
          <div class="movie-duration" id="movieduration"><span class="genre-detail" id="genredetail">Duration
                  :</span>${
                    movieDetails.duration
                  }<i class="fa fa-hourglass-half movie-duration-time" id="moviedurationtime"
                  aria-hidden="true"></i></div>
          <div class="movie-rating" id="movierating">
              ${(
                '<i class="fa fa-star movie-star-rating" id="' +
                movieDetails._id +
                '" aria-hidden=" true"></i>'
              ).repeat(ratingCounter[0])}
              ${(
                '<i class="fa fa-star-half-o movie-star-rating" id="' +
                movieDetails._id +
                '" aria-hidden=" true"></i>'
              ).repeat(ratingCounter[1])}
              ${(
                '<i class="fa fa-star-o movie-star-rating" id="' +
                movieDetails._id +
                '" aria-hidden=" true"></i>'
              ).repeat(ratingCounter[2])}
                     </div>
          <div class="movie-details-session">
                  ${movieDetails.sessions
                    .map(session => {
                      return (
                        session.cinema.state +
                        ' - ' +
                        session.cinema.location +
                        '<br>' +
                        createSessionhtml(session.sessionDateTime)
                      );
                    })
                    .join('\n')}
                    </div>
      </div>
  </div>
</div>
<div class="movie-details-story-container" id="moviedetailsstorycontainer">
  <div class="movie-details-story" id="moviedetailsstory">
      <div class="movie-details-title"> ${movieDetails.title}</div>
      <div class="movie-detailed-script" id="moviedetailedscript">
          <p>${movieDetails.synopsis}</p>
      </div>
      <div class="movie-details-title"><i class="fa fa-users movie-cast" id="moviecast" aria-hidden="true"></i>Starring</div>
      <ul class="movie-cast-list" id="moviecastlist">
      ${movieDetails.leadActors
        .join(',')
        .split(',')
        .map(leadActor => {
          return '<li class="movie-cast-name" id="">' + leadActor;
        })
        .join(',</li>\n') + '.</li>'}
      </ul>
      <div class="movie-crew">Crew</div>
      <ul class="movie-crew-list" id="moviecrewlist">
          <li class="movie-crew-name" id="moviecrewname"><span class="genre-detail" id="genredetail">Director
                  :</span>
              ${movieDetails.crew.director},</li>
          <li class="movie-crew-name" id="moviecrewname"><span class="genre-detail" id="genredetail">Music-Director
                  :</span>
              ${movieDetails.crew.musicDirector}</li>
      </ul>
  </div>
  <div class="movie-details-booking" id="moviedetailsbooking">
      <button class="movie-book-btn"><i class="fa fa-ticket movie-ticket" id="movieticket" aria-hidden="true"></i>Book
          now</button>
      <button id='detailsBackBtn' class="movie-back-btn"><i class="fa fa-undo previous-page" id="previouspage" aria-hidden="true"></i>Back</button>
  </div>
</div>`;

  function createSessionhtml(sessionDateTimes) {
    let sessionObj = {};
    let dateTimeHtmlElement = '';

    sessionDateTimes.forEach(sessionDateTime => {
      console.log(
        sessionDateTime
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-')
      );
      sessionObj[
        sessionDateTime
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-')
      ] = [];
    });

    sessionDateTimes.forEach(sessionDateTime => {
      sessionObj[
        sessionDateTime
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-')
      ].push(
        sessionDateTime.split('T')[1].split(':')[0] +
          ':' +
          sessionDateTime.split('T')[1].split(':')[1]
      );
    });

    Object.keys(sessionObj).forEach(date => {
      dateTimeHtmlElement +=
        '<i class="fa fa-calendar movie-session-calendar" id="${movieDetails._id}" aria-hidden="true"></i> ' +
        date +
        ' : <i class="fa fa-clock-o movie-session-clock" id="${movieDetails._id}" aria-hidden="true"></i> ';
      dateTimeHtmlElement += sessionObj[date].join(', ');

      dateTimeHtmlElement += '<br>';
    });

    return dateTimeHtmlElement;
  }

  let backBtn = document.querySelector('#detailsBackBtn');
  backBtn.addEventListener('click', function() {
    displayListView(APIData);
    // window.history.back();
    console.log('clicked back');
  });
};