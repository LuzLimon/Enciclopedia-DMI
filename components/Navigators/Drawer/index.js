import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const DrawerComponent = ({ drawerScreens, initialRoute }) => (
    <Drawer.Navigator initialRouteName={initialRoute}>
        {drawerScreens.map((drawerScreen) => (
            <Drawer.Screen
                name={drawerScreen.name}
                component={drawerScreen.component}
            />
        ))}
    </Drawer.Navigator>
);
