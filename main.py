

                profile["Age"] = age
                break
            else:
                print("Age must be greater than 0.")
        except:
            print("Enter a valid age.")

    profile["Gender"] = input("Enter Gender : ")

    while True:
        try:
            height = float(input("Enter Height (cm) : "))
            if height > 0:
                profile["Height"] = height
                break
            else:
                print("Invalid height.")
        except:
            print("Enter a valid height.")

    while True:
        try:
            weight = float(input("Enter Weight (kg) : "))
            if weight > 0:
                profile["Weight"] = weight
                break
            else:
                print("Invalid weight.")
        except:
            print("Enter a valid weight.")

    print("\nProfile Created Successfully.")
    pause()


def view_profile():

    if len(profile) == 0:
        print("\nNo profile found.")
        pause()
        return

    print("\nUser Profile")
    print("-" * 25)

    print("Name    :", profile["Name"])
    print("Age     :", profile["Age"])
    print("Gender  :", profile["Gender"])
    print("Height  :", profile["Height"], "cm")
    print("Weight  :", profile["Weight"], "kg")

    pause()


def set_goals():

    print("\nSet Daily Goals")
    print("-" * 25)

    while True:
        try:
            steps = int(input("Daily Step Goal : "))
            if steps > 0:
                goals["Steps"] = steps
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    while True:
        try:
            water = float(input("Daily Water Goal (Litres) : "))
            if water > 0:
                goals["Water"] = water
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    while True:
        try:
            workout = int(input("Daily Workout Goal (Minutes) : "))
            if workout > 0:
                goals["Workout"] = workout
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    print("\nGoals Saved Successfully.")
    pause()
def update_progress():

    if len(goals) == 0:
        print("\nPlease set your daily goals first.")
        pause()
        return

    print("\nUpdate Today's Progress")
    print("-" * 25)

    while True:
        try:
            steps = int(input("Today's Steps : "))
            if steps >= 0:
                progress["Steps"] = steps
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    while True:
        try:
            water = float(input("Water Consumed (Litres) : "))
            if water >= 0:
                progress["Water"] = water
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    while True:
        try:
            workout = int(input("Workout Done (Minutes) : "))
            if workout >= 0:
                progress["Workout"] = workout
                break
            else:
                print("Invalid value.")
        except:
            print("Enter a valid number.")

    print("\nToday's Progress Updated Successfully.")
    pause()


def view_progress():

    if len(goals) == 0:
        print("\nPlease set your goals first.")
        pause()
        return

    if len(progress) == 0:
        print("\nNo progress available.")
        pause()
        return

    step_percent = (progress["Steps"] / goals["Steps"]) * 100
    water_percent = (progress["Water"] / goals["Water"]) * 100
    workout_percent = (progress["Workout"] / goals["Workout"]) * 100

    if step_percent > 100:
        step_percent = 100

    if water_percent > 100:
        water_percent = 100

    if workout_percent > 100:
        workout_percent = 100

    overall = (step_percent + water_percent + workout_percent) / 3

    print("\nToday's Progress")
    print("-" * 35)

    print("Steps")
    print(progress["Steps"], "/", goals["Steps"])
    print("Completion :", round(step_percent, 2), "%\n")

    print("Water")
    print(progress["Water"], "/", goals["Water"], "L")
    print("Completion :", round(water_percent, 2), "%\n")

    print("Workout")
    print(progress["Workout"], "/", goals["Workout"], "Minutes")
    print("Completion :", round(workout_percent, 2), "%")

    print("\nOverall Progress :", round(overall, 2), "%")

    if overall == 100:
        print("\nExcellent! Goal Achieved.")

    elif overall >= 70:
        print("\nGreat Job! Keep Going.")

    else:
        print("\nDon't Give Up! You Can Do It!")

    pause()


welcome()

while True:

    menu()

    choice = input("\nEnter Your Choice : ")

    if choice == "1":
        create_profile()

    elif choice == "2":
        view_profile()

    elif choice == "3":
        set_goals()

    elif choice == "4":
        update_progress()

    elif choice == "5":
        view_progress()

    elif choice == "6":
        print("\nThank You For Using Fitness Goal Tracker.")
        break

    else:
        print("\nInvalid Choice.")
        pause()
