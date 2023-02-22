//================================ Inisialisasi Library yang telah di Install =============================================
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const multer = require("multer") // untuk upload file
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file
const moment = require("moment")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//================================ Konfigurasi =============================================
// Konfigurasi proses upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

//Konfigurasi ke database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log("mysql connected");
    }
})

//================================================ CRUD PELANGGAN ================================================
//akses data pelanggan
app.get("/pelanggan", (req,res) => {

    let sql = "select * from pelanggan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                pelanggan : result
            }
        }
        res.json(response)
    })

})

//akses data pelanggan id tertentu
app.get("/pelanggan/:id", (req,res) => {

    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                pelanggan : result
            }
        }
        res.json(response)
    })

})

//menambah data pelanggan
app.post("/pelanggan", (req,res) => {
    
    let data = {
        nama_pelanggan : req.body.nama_pelanggan,
        alamat : req.body.alamat,
        kontak : req.body.kontak
    }

    let sql = "insert into pelanggan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data pelanggan berhasil ditambahkan"
            }
        }
        res.json(response)
    })

})

//mengubah data pelanggan
app.put("/pelanggan", (req,res) => {

    let data = [
        {
            nama_pelanggan : req.body.nama_pelanggan,
            alamat : req.body.alamat,
            kontak : req.body.kontak
        },

        {
            id_pelanggan : req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data pelanggan berhasil diperbarui"
            }
        }
        res.json(response)
    })

})

//menghapus data penyewa
app.delete("/pelanggan/:id", (req,res) => {
    let data = {
        id_pelanggan : req.params.id
    }

    let sql = "delete from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data pelanggan berhasil dihapus"
            }
        }
        res.json(response)
    })

})

//================================================ CRUD KARYAWAN ================================================

//<============================== ADMIN ==============================>
//akses data karyawan
app.get("/karyawan", (req,res) => {

    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })

})

//akses data karyawan id tertentu
app.get("/karyawan/:id", (req,res) => {

    let data = {
        id_karyawan: req.params.id
    }

    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })

})

//menambah data karyawan
app.post("/karyawan", (req,res) => {
    
    let data = {
        nama_karyawan : req.body.nama_karyawan,
        alamat_karyawan : req.body.alamat_karyawan,
        username : req.body.username,
        password : req.body.password
    }

    let sql = "insert into karyawan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })

})

//mengubah data karyawan
app.put("/karyawan", (req,res) => {

    let data = [
        {
            nama_karyawan : req.body.nama_karyawan,
            alamat_karyawan : req.body.alamat_karyawan,
            kontak : req.body.kontak,
            username : req.body.username,
            password : req.body.password
        },

        {
            id_karyawan : req.body.id_karyawan
        }
    ]

    let sql = "update karyawan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data karyawan berhasil diperbarui"
            }
        }
        res.json(response)
    })

})

//menghapus data karyawan
app.delete("/karyawan/:id", (req,res) => {
    let data = {
        id_karyawan : req.params.id
    }

    let sql = "delete from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data pelanggan berhasil dihapus"
            }
        }
        res.json(response)
    })

})

//================================================ CRUD MOBIL ================================================
//akses data mobil
app.get("/mobil", (req,res) => {

    let sql = "select * from mobil"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                mobil : result
            }
        }
        res.json(response)
    })

})

//akses data mobil id tertentu
app.get("/mobil/:id", (req,res) => {

    let data = {
        id_mobil: req.params.id
    }

    let sql = "select * from mobil where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                mobil : result
            }
        }
        res.json(response)
    })

})

//menambah data mobil
app.post("/mobil", upload.single("image"), (req,res) => {
    
    let data = {
        nomor_mobil : req.body.nomor_mobil,
        merk : req.body.merk,
        jenis : req.body.jenis,
        warna : req.body.warna,
        tahun_pembuatan : req.body.tahun_pembuatan,
        biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        image : req.file.filename
    }

    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } 
    else {
        let sql = "insert into mobil set ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data mobil berhasil ditambahkan"
            })
        })
    }

})

//mengubah data mobil
app.put("/mobil", upload.single("image"), (req,res) => {

    let data = [
        {
            nomor_mobil : req.body.nomor_mobil,
            merk : req.body.merk,
            jenis : req.body.jenis,
            warna : req.body.warna,
            tahun_pembuatan : req.body.tahun_pembuatan,
            biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
            image : req.file.filename
        },

        {
            id_mobil : req.body.id_mobil
        }
    ]

    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } 
    else {
        let sql = "update mobil set ? where ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data mobil berhasil diperbarui"
            })
        })
    }

})

//menghapus data mobil
app.delete("/mobil/:id", (req,res) => {
    let data = {
        id_mobil : req.params.id
    }

    let sql = "delete from mobil where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data mobil berhasil dihapus"
            }
        }
        res.json(response)
    })

})

//================================================ TRANSAKSI SEWA ================================================
//menambah data sewa
app.post("/sewa", (req,res) => {
    let data = {
        id_sewa: req.body.id_sewa,
        id_mobil: req.body.id_mobil,
        id_karyawan: req.body.id_karyawan,
        id_pelanggan: req.body.id_pelanggan,
        tgl_sewa: moment().format('YYYY-MM-DD HH:mm:ss'),
        tgl_kembali: req.body.tgl_kembali,
        total_bayar: req.body.total_bayar
    }

    let sql = "insert into sewa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            res.json({message: "Data sewa berhasil ditambahkan"})
        }
    })
})

//akses data sewa
app.get("/sewa", (req,res) => {
    let sql = 
    "select s.id_sewa, m.id_mobil, m.nomor_mobil, m.merk, m.jenis, m.warna, k.id_karyawan, k.nama_karyawan, p.id_pelanggan, p.nama_pelanggan, s.tgl_sewa, s.tgl_kembali, s.total_bayar " + 
    "from sewa s join mobil m on s.id_mobil = m.id_mobil " + 
    "join karyawan k on s.id_karyawan = k.id_karyawan " + 
    "join pelanggan p on s.id_pelanggan = p.id_pelanggan"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }
        else{
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})

//mengubah data sewa
app.put("/sewa", (req,res) => {

    let data = [
        {
            id_mobil: req.body.id_mobil,
            id_karyawan: req.body.id_karyawan,
            id_pelanggan: req.body.id_pelanggan,
            tgl_kembali: req.body.tgl_kembali,
            total_bayar: req.body.total_bayar
        },

        {
            id_sewa: req.body.id_sewa
        }
    ]
    let sql = "update sewa set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + " Data sewa berhasil diperbarui"
            }
        }
        res.json(response) 
    })
})

//menghapus data sewa
app.delete("/sewa/:id_sewa", (req, res) => {
    let param = { id_sewa: req.params.id_sewa}

    let sql = "delete from sewa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } 
        else {
            res.json({message: "Data sewa berhasil dihapus"})
        }
    })
})


app.listen(4000, () => {
    console.log("Sewa Mobil Run On Port 4000");
})
