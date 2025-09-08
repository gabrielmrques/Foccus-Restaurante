
import { db } from "@lib/prisma";

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    return <h1>{restaurant?.name}</h1>;
};
