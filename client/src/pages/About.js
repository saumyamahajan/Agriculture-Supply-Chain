import React from "react";

const About = () => {
    let itemNames ;
   
    const resources = [{
        title: 'Learn JS',
        categories: [{
          name: 'javascript'
        }, {
          name: 'css'
        }]
      }, {
        title: 'Learn CSS',
        categories: [{
          name: 'css'
        }]
      }, {
        title: 'Learn other stuff',
        categories: [{
          name: 'jQuery'
        }, {
          name: 'javascript'
        }]
      }, {
        title: 'Learn node',
        categories: [{
          name: 'node'
        }]
      }, {
        title: 'Learn React',
        categories: [{
          name: 'react',
          place : 'singapore'
        }]
      }];

      const result3= resources.filter(obj => obj.categories.some(cat => cat.place !== 'singapore'));
      console.log(result3);

    const nodes = [
        {
          label: 'Egor1',
          value: 'Egor1',
          restorePoint: '25/10/2017 10:00:29 PM',
          vmcount: '2',
          restorePointsCount: '',
          children: [
            {
              label: 'disk111111111111111',
              value: 'disk1',
              restorePoint: '3 days ago',
              vmcount: '',
              restorePointsCount: '11',
            },
            {
              label: 'disk22222222222222',
              value: 'disk2',
              name: 'jobname2',
              restorePoint: '4 days ago',
              vmcount: '',
              restorePointsCount: '11',
            },
            {
              label: 'disk555',
              value: 'disk552',
              name: 'jobnam555e2',
              restorePoint: '4 days ago',
              vmcount: '',
              restorePointsCount: '11',
            },
          ],
        },
        {
          label: 'Egor12',
          value: 'Egor12',
          restorePoint: '25/10/2017 10:00:29 PM',
          vmcount: '22',
          restorePointsCount: '',
          children: [
            {
              label: 'disk111111111111111',
              value: 'disk1',
              restorePoint: '2 days ago',
              vmcount: '',
              restorePointsCount: '12',
            },
            {
              label: 'disk22222222222222',
              value: 'disk2',
              name: 'jobname2',
              restorePoint: 'restorepoint4',
              vmcount: '',
              restorePointsCount: '12',
            },
          ],
        },
      ]

      const value = 'disk552'

  const result = nodes.map(item => ({
      ...item,
      children: item.children
        .filter(child => child.value !== value)
        // .filter(child => child.value.includes(value.toLowerCase() ))
    }))
    .filter(item => item.children.length > 0)

    console.log(result)

//    let nestedObject = [
//         {
//             itemId: 1,
//             itemDetails: {
//                 name: "C",
//                 caregory: "Programming Language",
//                 price: 500,
//             },
//             itemCategory: "Basic",

//             people:[
//                 {"peopleId":"l5fno4178vvsimzjx1i","peopleName":"nasir","peopleWork":"mining","peopleWages":"2761"},
//                 {"peopleId":"l5gnp0cwbs4c5qw2cm4","peopleName":"john","peopleWork":"farmer","peopleWages":"5000"},
//                 {"peopleId":"l5jbtg7glulhhfjn139","peopleName":"Kota","peopleWork":"farming","peopleWages":"287"},
//                 {"peopleId":"l5jbyi6dccx30bwld95","peopleName":"oja","peopleWork":"cycling","peopleWages":"287"}
//             ]

//         },
//         {
//             itemId: 2,
//             itemDetails: {
//                 name: "C++",
//                 caregory: "Programming Language",
//                 price: 700,
//             },
//             itemCategory: "Beginner",
//         },
//         {
//             itemId: 1,
//             itemDetails: {
//                 name: "Java Script",
//                 caregory: "Web Development",
//                 price: 1500,
//             },
//             itemCategory: "Advanced",
//         }]
   
       // itemNames= nestedObject.filter(eachObj => eachObj.itemDetails.price != 1500) 
        // itemNames = nestedObject.filter(eachObj => eachObj.people["peopleName"]!= 'kota')
    //    const res2= nestedObject.map(item => ({
    //             ...item,
    //             people:item.people.filter(child  => child.peopleName !== 'john' )
    //             }
    //         )).filter(item => item.people.length > 0)

    return (
       <div> <ul>{ [1, 2, 3].map(item => <li key="{item}">{item}</li>)} </ul>
        <h1>About</h1> 
             {/* {JSON.stringify(itemNames)}  <br></br>    */}
             {/* {res2} */}
        </div>


// const hero = [{'id' : 1, 'name' : 'hero1'}, {'id': 2, 'name' : 'hero2'}];
// //remove hero1
// const updatedHero = hero.filter(item => item.id !== 1);

    )

}

export default About 