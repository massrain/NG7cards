declare const Buffer
import { Component, OnInit } from '@angular/core';
import Jimp from 'jimp';
import * as FileSystem from "fs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Photo-App';
  name: string;
  picture: ImageBitmap;
  url: string;
  image: string;
  cardnumber: string; 
  imagesrc: any;

  ngOnInit() {
    this.name = "Test";
    this.cardnumber = "123 456 789";
    console.log("ngOnInit run..");
    this.url = "assets/goldcredit.png";
    //renk kodu: BA6E16
    //this.image = "Testdeneme";
    //this.ImageLoad();
  }


  private ImageLoad() {
    Jimp.read('assets/goldcredit.png')
      .then(image => {

        // Do stuff with the image.
        image.resize(800, 565)
        //image.blur(4);

        Jimp.loadFont("assets/font36/font36.fnt").then(font => {
          image.print(font, 180, 365, this.name);
          /*        Jimp.measureText(font, 'Some'); // width of text
                  Jimp.measureTextHeight(font, 'Some string', 100); */
          this.newMethod(image);
        })
          .catch(err => {
            // Handle an exception.
            console.log(err);
          });
      })
      .catch(err => {
        // Handle an exception.
        console.log(err);
      });
  }

  private newMethod(image: Jimp) {
    image.getBase64(image.getMIME(), (err, Buff) => {
      // console.log(Buff)//null
      // this.PutImage(Buff);
/*       var img = document.createElement("img");
      img.setAttribute("src", Buff);
      document.getElementById("appendDiv").appendChild(img); */
      this.NewImage(Buff);
      return Buff;
    });
  }

  private NewImage(Buff) {
    Jimp.read(Buff)
      .then(image => {

        // Do stuff with the image.
        image.resize(800, 565);

        Jimp.loadFont("assets/font48/font48.fnt").then(font => {
          image.print(font, 180, 275, this.cardnumber);
          image.getBase64(image.getMIME(), (err, Buff) => {
            var img = document.createElement("img");
            img.setAttribute("src", Buff);
            document.getElementById("appendDiv").appendChild(img);
          });
        })
      })
      .catch(err => {
        // Handle an exception.
        console.log(err);
      });
  }

  imgReset() {
    console.log("New Image Load working.");
    this.ImageLoad();
  }

}
