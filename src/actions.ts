import { CompanionActionDefinitions } from "@companion-module/base";


export function getActions(): CompanionActionDefinitions {

	let actions: CompanionActionDefinitions = {};
	let CHOICES_CHANNELS =[];
	let CHOICES_CG =[];
	let CHOICES_AUX =[];
	let CHOICES_GO =[];
	for (var i = 1; i < 145; i++) {
		CHOICES_CHANNELS.push({ label: `ch ${i}`, id: i})
	}
	for (var i = 1; i < 25; i++) {
		CHOICES_CG.push({ label: `CG ${i}`, id: i})
	}
	for (var i = 1; i < 13; i++) {
		CHOICES_AUX.push({ label: `Aux ${i}`, id: i})
	}
	for (var i = 1; i < 13; i++) {
		CHOICES_GO.push({ label: `Group Output ${i}`, id: i})
	}

    actions['fader'] = {
        name: 'Set Fader Level',
        options: [
            {
                label: 'channel number',
                type: 'number',
                id: 'channel',
                min: 1,
                max: 2,
                default: 1,
            },
            {
                label: 'fader value',
                type: 'number',
                id: 'fader',
                min: -150,
                max: 10,
                default: 0,
            }],
        callback: (action) => {
        }
    }

    return actions;
}

// import { CompanionActionDefinitions } from "@companion-module/base";

// export function getActions(): CompanionActionDefinitions {

// 	let actions = [];
// 	actions.length = 0;
// 	let CHOICES_CHANNELS =[];
// 	let CHOICES_CG =[];
// 	let CHOICES_AUX =[];
// 	let CHOICES_GO =[];
// 	for (var i = 1; i < 145; i++) {
// 		CHOICES_CHANNELS.push({ label: `ch ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 25; i++) {
// 		CHOICES_CG.push({ label: `CG ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 13; i++) {
// 		CHOICES_AUX.push({ label: `Aux ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 13; i++) {
// 		CHOICES_GO.push({ label: `Group Output ${i}`, id: i})
// 	}

//     // actions['fader'] = {
//     //         name: 'Set Fader Level',
//     //         options: [
//     //             {
//     //                 label: 'channel number',
//     //                 type: 'dropdown',
//     //                 id: 'channel',
//     //                 default: '1',
//     //             },
//     //             {
//     //                 label: 'fader value',
//     //                 type: 'number',
//     //                 id: 'fader',
//     //                 default: 0,
//     //             }],
//     //         callback: (action) => {
//     //             this.log("info", JSON.stringify(action))
//     //         }
//     //     }

//     return {
//         fader: {
//             name: 'Set Fader Level',
//             options: [
//                 {
//                     label: 'channel number',
//                     type: 'number',
//                     id: 'channel',
//                     default: '1',
//                 },
//                 {
//                     label: 'fader value',
//                     type: 'number',
//                     id: 'fader',
//                     default: 0.75,
//                 }],
//             callback: (action) => {
//                 this.log("info", "Hello TJ")
//             }
//         },
//         coolaction: {
//             name: 'My first action',
//             options: [],
//             callback: (action) => {
//                 console.log('Hello World!')
//             }
//         }
//     };

// 	if(this.config.series == "S") {

// 		actions['snapshotS'] = {
// 			name: 'Fire snapshot S-series',
// 			options: [
// 				{
// 					label: 'number',
// 					type: 'number',
// 					id: 'snapshot',
// 					default: 1,
// 					min: 0,
// 					max: 9999
// 				}
// 			]
// 		}

// 		actions['snapshotNextS'] = {	label: 'Fire next snapshot S-series'	}

// 		actions['snapshotPrevS'] = {	label: 'Fire previous snapshot S-series'	}
// 	} else {

// 		if(this.config.series == "OSC") {
//             actions['fader'] = {
// 			label: 'Set fader of channel',
// 			options: [
// 			{
// 				label: 'channel number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: '1',
// 				choices: CHOICES_CHANNELS
// 			},
// 			{
// 				label: 'fader value',
// 				type: 'dropdown',
// 				id: 'fader',
// 				default: 0.75,
// 				choices: CHOICES_FADER
// 			}]
// 		}
//         }
//         else {
//         actions['fader'] = {
// 			label: 'Set fader of channel',
// 			options: [
// 			{
// 				label: 'channel number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: '1',
// 				choices: CHOICES_CHANNELS
// 			},
// 			{
// 				label: 'fader value',
// 				type: 'dropdown',
// 				id: 'fader',
// 				default: 0,
// 				choices: CHOICES_FADER_IPAD
// 			}]
// 		}
//         }

// 		actions['mute'] = {
// 			label: 'Mute channel',
// 			options: [
// 			{
// 				label: 'channel number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_CHANNELS
// 			},
// 			{
// 				label: 'mute on/off',
// 				type: 'dropdown',
// 				id: 'mute',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['auxmute'] = {
// 			label: 'Mute Aux',
// 			options: [
// 			{
// 				label: 'Aux Number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_AUX
// 			},
// 			{
// 				label: 'mute on/off',
// 				type: 'dropdown',
// 				id: 'auxmute',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['cgmute'] = {
// 			label: 'Mute Control Group',
// 			options: [
// 			{
// 				label: 'Control Group Number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_CG
// 			},
// 			{
// 				label: 'mute on/off',
// 				type: 'dropdown',
// 				id: 'cgmute',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['gomute'] = {
// 			label: 'Mute Group Output',
// 			options: [
// 			{
// 				label: 'Group Output Number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_GO
// 			},
// 			{
// 				label: 'mute on/off',
// 				type: 'dropdown',
// 				id: 'gomute',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['phantom'] = {
// 			label: 'Phantom channel',
// 			options: [
// 			{
// 				label: 'channel number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_CHANNELS
// 			},
// 			{
// 				label: 'Phantom on/off',
// 				type: 'dropdown',
// 				id: 'phantom',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['solo'] = {
// 			label: 'Solo channel',
// 			options: [
// 			{
// 				label: 'channel number',
// 				type: 'dropdown',
// 				id: 'channel',
// 				default: 1,
// 				choices: CHOICES_CHANNELS
// 			},
// 			{
// 				label: 'Solo on/off',
// 				type: 'dropdown',
// 				id: 'solo',
// 				default: '1',
// 				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
// 			}]
// 		}

// 		actions['snapshot'] = {
// 			label: 'Fire snapshot',
// 			options: [
// 				{
// 					label: 'number',
// 					type: 'number',
// 					id: 'snapshot',
// 					default: 1,
// 					min: 0,
// 					max: 9999
// 				}
// 			]
// 		}

// 		actions['snapshotNext'] = {	label: 'Fire next snapshot'	}

// 		actions['snapshotPrev'] = {	label: 'Fire previous snapshot'	}


// 		actions['macros'] = {
// 			label: 'Macro',
// 			options: [
// 				{
// 					label: 'number',
// 					type: 'number',
// 					id: 'macro',
// 					default: 1,
// 					min: 1,
// 					max: 256
// 				}
// 			]
// 		}
// 	}
// 	return actions
// }