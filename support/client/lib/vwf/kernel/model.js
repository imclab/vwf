"use strict";

// Copyright 2012 United States Government, as represented by the Secretary of Defense, Under
// Secretary of Defense (Personnel & Readiness).
// 
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
// 
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software distributed under the License
// is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing permissions and limitations under
// the License.

/// @module vwf/kernel/model
/// @requires vwf/model

define( [ "module", "vwf/model" ], function( module, model ) {

    return model.load( module, /** @lends module:vwf/kernel/model */ {

        // == Module Definition ====================================================================

        initialize: function() {
            this.state.enabled = true; // kernel reentry allowed?
            this.state.blocked = false; // kernel reentry attempted?
        },

        /// Allow kernel reentry from the drivers.

        enable: function() {
            this.state.enabled = true;
            this.state.blocked = false;
        },
        
        /// Prevent kernel reentry from the drivers.

        disable: function() {
            this.state.enabled = false;
            this.state.blocked = false;
        },

        /// Indicate if a driver attempted to call back into the kernel while reentry was disabled,
        /// and clear the *blocked* flag.
        
        blocked: function() {
            var blocked = this.state.blocked;
            this.state.blocked = false;
            return blocked;
        },
        
    }, function( modelFunctionName ) {

        // == Model API ============================================================================

        // The kernel bypasses vwf/kernel/model and calls directly into the first driver stage.

        return undefined;

    }, function( kernelFunctionName ) {

        // == Kernel API ===========================================================================

        switch ( kernelFunctionName ) {

            // -- Read-write functions -------------------------------------------------------------

            // TODO: setState
            // TODO: getState
            // TODO: hashState

            case "createNode":

                return function( nodeComponent, when, callback /* ( nodeID ) */ ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeComponent, function( nodeID ) {
                                callback && callback( nodeID );
                            } );
                        } else {
                            this.kernel.plan( undefined, kernelFunctionName, undefined,
                                [ nodeComponent ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "deleteNode":

                return function( nodeID, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                undefined, when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            // TODO: setNode
            // TODO: getNode

            case "createChild":

                return function( nodeID, childName, childComponent, childURI, when, callback /* ( childID ) */ ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, childName, childComponent, childURI, function( childID ) {
                                callback && callback( childID );
                            } );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, childName,
                                [ childComponent, childURI ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "addChild":

                return function( nodeID, childID, childName, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, childID, childName );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                [ childID, childName ], when, callback /* ( result ) */ );  // TODO: swap childID & childName?
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "removeChild":

                return function( nodeID, childID, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, childID );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                [ childID ], when, callback /* ( result ) */ );  // TODO: swap childID & childName?
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "setProperties":

                return function( nodeID, properties, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, properties );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                [ properties ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }
    
                };

            case "getProperties":

                return function( nodeID, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                undefined, when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };
    
            case "createProperty":

                return function( nodeID, propertyName, propertyValue, propertyGet, propertySet, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, propertyName, propertyValue, propertyGet, propertySet );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, propertyName,
                                [ propertyValue, propertyGet, propertySet ], when, callback /* ( result ) */ );  // TODO: { value: propertyValue, get: propertyGet, set: propertySet } ? -- vwf.receive() needs to parse
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            // TODO: deleteProperty

            case "setProperty":

                return function( nodeID, propertyName, propertyValue, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, propertyName, propertyValue );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, propertyName,
                                [ propertyValue ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "getProperty":

                return function( nodeID, propertyName, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, propertyName );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, propertyName,
                                undefined, when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };
    
            case "createMethod":

                return function( nodeID, methodName, methodParameters, methodBody, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, methodName, methodParameters, methodBody );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, methodName,
                                [ methodParameters, methodBody ], when, callback /* ( result ) */ );  // TODO: { parameters: methodParameters, body: methodBody } ? -- vwf.receive() needs to parse
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            // TODO: deleteMethod

            case "callMethod":

                return function( nodeID, methodName, methodParameters, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, methodName, methodParameters );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, methodName,
                                [ methodParameters ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };
    
            case "createEvent":

                return function( nodeID, eventName, eventParameters, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, eventName, eventParameters );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, eventName,
                                [ eventParameters ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            // TODO: deleteEvent

            case "fireEvent":

                return function( nodeID, eventName, eventParameters, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, eventName, eventParameters );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, eventName,
                                [ eventParameters ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };
    
            case "dispatchEvent":

                return function( nodeID, eventName, eventParameters, eventNodeParameters, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, eventName, eventParameters, eventNodeParameters );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, eventName,
                                [ eventParameters, eventNodeParameters ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };
    
            case "execute":

                return function( nodeID, scriptText, scriptType, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, scriptText, scriptType );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                [ scriptText, scriptType ], when, callback /* ( result ) */ );  // TODO: { text: scriptText, type: scriptType } ? -- vwf.receive() needs to parse
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "random":

                return function( nodeID, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                undefined, when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            case "seed":

                return function( nodeID, seed, when, callback ) {

                    if ( this.state.enabled ) {

                        if ( when === undefined ) {
                            return this.kernel[kernelFunctionName]( nodeID, seed );
                        } else {
                            this.kernel.plan( nodeID, kernelFunctionName, undefined,
                                [ seed ], when, callback /* ( result ) */ );
                        }

                    } else {
                        this.state.blocked = true;
                    }

                };

            // -- Read-only functions --------------------------------------------------------------

            case "time":
            case "client":
            case "moniker":

                return function() {
                    return this.kernel[kernelFunctionName]();
                };

            case "intrinsics":

                return function( nodeID, result ) {
                    return this.kernel[kernelFunctionName]( nodeID, result );
                };

            case "uri":
            case "name":

            case "prototype":
            case "prototypes":
            case "behaviors":

            case "ancestors":
            case "parent":
            case "children":
            case "descendants":

                return function( nodeID ) {
                    return this.kernel[kernelFunctionName]( nodeID );
                };

            case "find":

                return function( nodeID, matchPattern, callback /* ( matchID ) */ ) {
                    return this.kernel[kernelFunctionName]( nodeID, matchPattern, callback );
                };

            case "test":

                return function( nodeID, matchPattern, testID ) {
                    return this.kernel[kernelFunctionName]( nodeID, matchPattern, testID );
                };

        }

    } );

} );
