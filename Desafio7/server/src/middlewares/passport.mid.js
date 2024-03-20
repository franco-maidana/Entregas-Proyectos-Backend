import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Usuarios } from "../data/mongo/manager.model.js";
const {
  GOOGLE_ID_CLIENT,
  GOOGLE_SECRERT_CLIENT,
  CLIENT_ID_GITHUB,
  CLIEN_SECRERT_GITHUB,
} = process.env;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await Usuarios.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await Usuarios.create(data);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await Usuarios.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
          // req.session.email = email;
          // req.session.role = user.role;
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Google
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID_CLIENT,
      clientSecret: GOOGLE_SECRERT_CLIENT,
      callbackURL: "http://localhost:8080/api/session/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await Usuarios.readByEmail(profile.id);
        if (user) {
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await Usuarios.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Git-Hub
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: CLIENT_ID_GITHUB,
      clientSecret: CLIEN_SECRERT_GITHUB,
      callbackURL: "http://localhost:8080/api/session/github/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await Usuarios.readByEmail(profile.id);
        if (!user) {
          let newUser = {
            email: profile.id,
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          resultado = await Usuarios.create(newUser);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (payload, done) => {
      try {
        const user = await Usuarios.readByEmail(payload.email);
        console.log("esto es user ", user);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
