const { Tag } = require('../models'); // Import the Tag model

// Data to seed the tags table
const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// Function to bulk insert tag data into the Tag table
const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags; // Export the seedTags function for use in seedAll

