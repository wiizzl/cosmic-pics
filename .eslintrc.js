module.exports = {
    root: true,
    extends: ["expo", "plugin:tailwindcss/recommended"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
        },
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "no-undef": "off",
    },
};
