import { db } from "@/lib/db"

// Verification tokens
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email },
        })
        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { token },
        })
        console.log("Verification token", token)
        console.log("Verification token", verificationToken)
        return verificationToken;
    } catch (error) {
        console.log(error);
    }
}

// Password reset token
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email,
            }
        });

        return passwordResetToken;
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                token,
            }
        });

        return passwordResetToken;
    } catch (error) {
        return null;
    }
}