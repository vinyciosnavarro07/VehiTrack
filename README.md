# 📚 Sistema de Gerenciamento VehiTrack

Este projeto é um sistema completo de gerenciamento de concessionárias, desenvolvido com **Java Spring Boot** no backend e **HTML/CSS/JavaScript** no frontend. O sistema permite cadastrar, editar, excluir e listar carros, modelos, marcas e tipos de veiculo.

## ✅ Funcionalidades

- Cadastro, edição, remoção e listagem de:
  - Carros
  - Modelos
  - Marcas
  - Tipos de Veiculos
- Interface visual simples e direta em HTML
- Conexão com banco de dados MySQL
- Operações CRUD completas com feedback ao usuário

---

## 💻 Requisitos para executar o projeto

Antes de iniciar, verifique se você possui os seguintes programas instalados no seu computador:

- [Java JDK 17+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (ou outro IDE compatível com Maven/Spring Boot)
- [VSCODE](Para usar o live Server e ver a interface visual em HTML) 
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Node.js (opcional, para servidor local de arquivos estáticos)](https://nodejs.org/)
- Navegador web moderno (Chrome, Firefox, Edge, etc.)

---

## 📦 Clonando o projeto

```bash
git clone https://github.com/vinyciosnavarro07/VehiTrack.git
```

---

## 🗄️ Configurando o banco de dados

1. Abra o **MySQL Workbench**.
2. Crie um banco com as tabelas executando o script SQL:

   Caminho do arquivo:  
   ```
   projeto-VehiTrack\VehiTrack-back-end\src\main\java\br\com\fecaf\database\model.sql
   ```

3. Execute o script no Workbench para criar o banco `db_vehitrack` e as tabelas necessárias.
4. Configurando os acessos de usuario do mysql dentro do back-end:
   
   Caminho do arquivo:  
   ```
   projeto-VehiTrack\VehiTrack-back-end\src\main\resources\application
   ```
5. Abra o arquivo: application, dentro dele vão ter as linhas:
   ```
   spring.datasource.username=usuario
   ```
   ```
   spring.datasource.password=senha
   ```
6. Nessas linhas adicione o seu usuario e senha do mysql
---

## 🚀 Executando o servidor

1. Abra o projeto na **IDE IntelliJ** aponte a pasta VehiTrack-back-end.
2. Navegue até a classe principal:  
   ```
   projeto-VehiTrack\VehiTrack-back-end\src\main\java\br\com\fecaf\App.java
   ```
3. Clique em **"Run"** ou pressione `Shift + F10` para iniciar o servidor.

O servidor será iniciado na porta padrão `8080`.

---

## 🌐 Acessando o frontend

1. Vá até a pasta onde está o arquivo `index.html` aponte a pasta VehiTrack-front-end no VSCODE.  
   Exemplo:
   ```
   projeto-VehiTrack\VehiTrack-front-end\index.html
   ```

2. Abra esse arquivo no navegador com a seguinte URL:

```
http://127.0.0.1:5501/index.html
```

> Obs.: Para isso funcionar corretamente, é necessário servir a pasta com algum servidor de arquivos estáticos. Você pode usar a extensão do VS Code chamada **Live Server**, ou usar um servidor local com Node.js:

```bash
# Exemplo com Node.js
npm install -g serve
serve .
```

---

## 📂 Estrutura básica do projeto

```
VehiTrack/
│
├── src/
│   ├── main/
│   │   ├── java/br/com/fecaf/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── App.java  ← Classe principal para subir o backend
│   │   └── resources/
│   │       ├── static/  ← Arquivos HTML, CSS, JS (frontend)
│   │       └── application.properties
│   └── test/
│
├── pom.xml
└── README.md
```

---

## 🛠️ Tecnologias utilizadas

- **Java 17**
- **Spring Boot**
- **MySQL**
- **HTML5 / CSS3 / JavaScript**
- **IntelliJ IDEA**
- **VSCODE**

---

## ✍️ Autor

Desenvolvido por Vinycios Navarro.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
