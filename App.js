import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


let timer = null;

let mss = 0;
let ss = 0;
let mm = 0;
let hh = 0;

function App(){

  const [number, setNumber] = useState('00:00:00');
  const [goButton, setGoButton]= useState('Start');
  const [lastLap, setLastLap] = useState(null);

  function start(){
    
    if(timer !== null){
      // It will stop the timer
    clearInterval(timer);
    timer = null;

    setGoButton('Start');
    }else{
      //It starts the timer
      timer = setInterval(() => {
        mss++;

        if(mss == 60){
          mss = 0;
          ss++;
        }

        if(ss == 60){
          ss = 0,
          mm++;
        }

        if(mm == 60){
          mm = 0;
          hh++;
        }

        let formatWithHour = 
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss) + ':'
        + (mss < 10 ? '0' + mss : mss);

        let formatWithoutHour =
        (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss) + ':'
        + (mss < 10 ? '0' + mss : mss);



        if(hh < 1){
          setNumber(formatWithoutHour);
        }else{
          setNumber(formatWithHour)
        }

      }, 1);

      setGoButton('Lap');

    }


  }

  function clear(){

    if(timer !== null){
      // It stops the timer
      clearInterval(timer);
      timer = null;
    }

    setLastLap(number);

    setNumber('00:00:00');
    mss = 0;
    ss = 0;
    mm = 0;
    hh = 0; 

    setGoButton('Start');



  }

  return(

    <View style={styles.container}>
      <View style={styles.imgView}>
      <Image source={require('./src/stopWatch.png')} style={styles.img}/>

      <Text style={styles.timer}>{number}</Text>
      </View>

      <View style={styles.btnArea}>
      <TouchableOpacity style={styles.btn} onPress={ start }>
          <Text style={styles.btnText}>
            {goButton}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={ clear }>
          <Text style={styles.btnText}>
            Clear
          </Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.lapText}>{lastLap ? 'Last Lap: ' + lastLap : ''}</Text>

    </View>

  );
}

let styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },

  img:{
    width: 300,
    height: 370,
  },  

  timer:{
    fontSize: 45,
    color: '#FFF',
    marginTop: -175,
  },

  imgView:{
    alignItems: 'center',
    justifyContent: 'center',

  },

  btn:{
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#0086ef',
    margin: 17,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnArea:{
    flexDirection: 'row',
    height: 40,
    marginTop: 150,
  },

  btnText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00aeef'
  },

  lapText:{
    marginTop: 70,
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic'
  }


});

export default App;
