import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

// This is a canister
actor Dbank {
  stable var currentValue: Float = 300; // Stable makes the variable othogonally persistant
  // currentValue :=100; // Changes value need to use := not just =

  // let id = 23423423423423423; // this is a constant cannont be changed
  
  // Debug.print("Hello");  // print string
  // Debug.print(debug_show(id));  // print variable

  stable var startTime = Time.now(); // Start time of canister

  public func resetAccount(amout: Float) {
    currentValue := amout;
    startTime := Time.now();
    Debug.print(debug_show(currentValue));
  };

  public func topUp(amout: Float) { // Public allows it to be seen outside the canister (Nat is "Natural Number, any positive number")
    currentValue += amout;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawal(amount: Float) { // Public allows it to be seen outside the canister (Nat is "Natural Number, any positive number")
    let tempValue: Float = currentValue - amount; // Explicitly state data type Int
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Not enough moola :(, withdawl too large");
    }
  };

  public query func checkBalance(): async Float {  // Read only opperation is much faster, must have async value return
    return currentValue;
  };

  public func compoud(){
    let currentTime =  Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };


}