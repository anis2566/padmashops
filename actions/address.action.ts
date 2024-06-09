"use server"

import { db } from "@/lib/db"
import { AddressSchema, AddressSchemaType } from "@/schema/address.schema"
import { getUser } from "@/services/user.services"

export const CREATE_ADDRESS = async (values: AddressSchemaType) => {
    const {data, success} = AddressSchema.safeParse(values)

    if(!success) {
        throw new Error("Invalid input value")
    }

    const {userId} = await getUser()

    const address = await db.shippingInfo.findFirst({
        where: {
            title: data.title,
            userId
        }
    })

    if(address) {
        throw new Error("Addres with this name exists")
    }

    await db.shippingInfo.create({
        data: {
            ...data,
            userId
        }
    })

    return {
        success: "Address saved"
    }
}


export const GET_USER_ADDRESS = async () => {
    const {userId} = await getUser()

    const addresses = await db.shippingInfo.findMany({
        where: {
            userId,
            title: {
                not: ""
            }
        }
    })

    return {
        addresses
    }
}


export const DELETE_USER_ADDRESS = async (addressId: string) => {
    const { userId } = await getUser();

    const deletedAddress = await db.shippingInfo.deleteMany({
        where: {
            id: addressId,
            userId: userId
        }
    });

    if (deletedAddress.count === 0) {
        throw new Error("Address not found");
    }

    return {
        success: "Address deleted"
    };
}
