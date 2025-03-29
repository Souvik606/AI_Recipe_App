import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { useFetch } from "@/lib/fetch";
import { Categories } from "@/types/type";

const Category = () => {
    const { data: categories, loading, error } = useFetch<Categories[]>('/(api)/categories');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Category</Text>
            {loading && <Text style={{
                fontFamily:'outfit',
                textAlign:'center',
                marginTop:50
            }}>Loading ......</Text>}
            {!loading && <FlatList
              data={categories}
              numColumns={4}
              columnWrapperStyle={{ marginBottom: 20 }}
              scrollEnabled={false}
              keyExtractor={(item) => item.category_id.toString()} // Ensure unique keys
              renderItem={({ item, index }: { item: Categories; index: number }) => (
                  <View style={styles.categoryContainer}>
                      <Image source={{ uri: item.image_url }} style={styles.image} />
                      <Text style={styles.categoryText}>{item.category_name}</Text>
                  </View>
              )}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 15,
        marginLeft: 20
    },
    categoryContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 8
    },
    image: {
        width: 60,
        height: 60
    },
    categoryText: {
        fontFamily: 'outfit',
        marginTop: 3,
        fontSize: 16,
    }
});

export default Category;
