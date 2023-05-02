<img width='50%' src="https://user-images.githubusercontent.com/113889290/235655856-9e8fd471-ad2a-4616-bb51-de26d35938b3.png">
<h2><a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=700&size=40&pause=1000&color=FFFFFF&background=F1764C&center=true&vCenter=true&width=750&height=45&lines=Found+your+perfect+movie+Match" alt="Typing SVG" /></a></h2><br>

Welcome to our IMDb API film randomizer ! Discover exciting films at random, Tinder-style, using IMDb's extensive database. Say goodbye to endless scrolling let Filmdeur do the work for you. Make informed decisions with detailed film information, including synopsis, reviews, and user ratings. Add some excitement to your movie nights with our IMDb API-powered film randomizer on GitHub.

---
## Functionalities of this command interpreter:
* Create a new object (ex: a new User or a new Place)
* Retrieve an object from a file, a database etc...
* Do operations on objects (count, compute stats, etc...)
* Update attributes of an object
* Destroy an object

## Table of Content

## Environment
This project is interpreted/tested on Ubuntu 14.04 LTS using python3 (version 3.4.3)

## Installation
* Clone this repository: `git clone "https://github.com/alexaorrico/AirBnB_clone.git"`
* Access AirBnb directory: `cd AirBnB_clone`

## File Descriptions
#### `console` directory contains the entry point of the command interpreter.
<details><summary>click to read more</summary><br>

[console.py](console.py) - List of commands this console current supports:
* `EOF` - exits console 
</details>


#### `/models/engine` directory contains File Storage class that handles JASON serialization and deserialization :
[file_storage.py](/models/engine/file_storage.py) - serializes instances to a JSON file & deserializes back to instances
<details><summary>click to read more</summary><br>
* `def all(self)` - returns the dictionary __objects
</details>

#### `/tests` directory contains all unit test cases for this project:
[/test_models/test_base_model.py](/tests/test_models/test_base_model.py) - Contains the TestBaseModel and TestBaseModelDocs classes
<details><summary>click to read more</summary><br>
TestBaseModelDocs class:
* `def setUpClass(cls)`- Set up for the doc tests

TestBaseModel class:
* `def test_is_base_model(self)` - Test that the instatiation of a BaseModel works
</details>

## Examples of use
```
vagrantAirBnB_clone$./console.py
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  create  destroy  help  quit  show  update

(hbnb) all MyModel
** class doesn't exist **
(hbnb) create BaseModel
** no instance found **
(hbnb) quit
```

## Bugs
No known bugs at this time. 

## Authors 
<div>
    TESSIER Vanessa | <a href="https://www.linkedin.com/in/vanessa-tessier-601794252/">
        <img alt="Anurag Hazra | CodeSandbox" height="20px" src="https://img.shields.io/badge/TessierVanessa-4A6552?style=for-the-badge&logo=linkedin&color=red&logoColor=white"/>
    </a>
<p align="right">Holberton School - TOULOUSE C19 Cohort APRIL. 2023
</p></div>
